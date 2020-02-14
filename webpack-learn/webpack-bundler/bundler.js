const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const path = require('path')
const babel = require('@babel/core')

const moduleAnalyser = (filename) => {   //模块分析，最终会返回入口文件和他的依赖文件，以及代码
  
  const content = fs.readFileSync(filename,'utf-8')
  const ast = parser.parse(content, {  //转换成抽象语法树
    sourceType: 'module'
  })
  const dependencies = {}   //收集文件依赖
  traverse(ast,{   //遍历对应类型的节点
    ImportDeclaration({node}) {
      const dirname = path.dirname(filename) //拿到文件的绝对路径
      const newFile = path.join(dirname,node.source.value)
      dependencies[node.source.value] = newFile //以文件名为键，绝对路径为值
    }
  })
  const { code } = babel.transformFromAst(ast,null,{   //将ast语法树转为ES5,浏览器可运行的代码
    presets: ["@babel/preset-env"]
  })
  return {   //返回入口文件和依赖以及翻译过的代码
    filename,   
    dependencies,
    code
  }
}

const makeDependenciesGraph = (entry) =>{ //依赖图谱，返回一个包含所有模块和其代码以及依赖的对象
  const entryModule = moduleAnalyser(entry)
  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    if(dependencies) {
      for(let j in dependencies) {
       graphArray.push(   //解析依赖对象并分析，然后push进数组
         moduleAnalyser(dependencies[j])
        )
      }   
    }
  }
  const graph = {}
  graphArray.forEach(item => {  //格式转换一下，文件名变为键
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}       

const generateCode = (entry) => {  //处理所有代码并返回浏览器能执行的代码
	const graph = JSON.stringify(makeDependenciesGraph(entry));
	return `
		(function(graph){  //1

			function require(module) { //2 //自己实现的一个require函数

				function localRequire(relativePath) { //3 //由于引用模块的路径格式和入口文件不同，所以又要定义一个依赖专用的require函数
					return require(graph[module].dependencies[relativePath]);   //引用文件的绝对路径存在依赖对象的值中
        }
        
        var exports = {};  //导出的对象，转义代码中会调用存值
        
				(function(require, exports, code){ //2  //最终函数执行体，需要require，exports和code
					eval(code)
        })(localRequire, exports, graph[module].code);
        
				return exports;  //2
      };
      
      require('${entry}')  //调用require函数并传入入口地址
      
		})(${graph});
	`;
}
const code = generateCode('./src/index.js')
console.log(code);
