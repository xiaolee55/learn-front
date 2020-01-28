window.onload=function(){
    if(!document.getElementsByClassName){                   //IE没有该方法，手动兼容
        document.getElementsByClassName=function(cls){
            var ret=[];
            var els=document.getElementsByTagName("*");
            for(var i=0,len=els.length;i<len;i++){
                if(els[i].className===cls
                ||els[i].className.indexOf(cls+'')>=0
                ||els[i].className.indexOf(''+cls+'')>=0
                ||els[i].className.indexOf(''+cls)>=0){
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }
    var carTable=document.getElementById("carTable");                    //表格ID
    var tr=carTable.childNodes[3].rows;                                  //获取表体，由于存在空格，所以下标是3，rows是表格元素的特有属性，存放所有的行（tr）
    var checkInputs=document.getElementsByClassName("check");            //获取单选框的集合
    var checkAllInputs=document.getElementsByClassName("check-all");     //获取所有的全选框
    var selectedTotal=document.getElementById('selectedTotal');           //获取件数计数器
    var priceTotal=document.getElementById('priceTotal');                //获取价格计数器
    var add=document.getElementsByClassName("add");                     //获取件数增加的按钮
    var selected=document.getElementById('selected');                     //获取伸展标志
    var foot=document.getElementById('foot');                             //获取底栏
    var selectedViewList=document.getElementById('selectedViewList');    //获取已选商品展示栏
    var deleteAll=document.getElementById("deleteAll");                 //获取删除全部的按钮


    function getTotal(){                                     //计算当前商品总金额
        var selected=0;
        var price=0;
        var HTMLstr='';
        for(var i=0,len=tr.length;i<len;i++){
            if(tr[i].getElementsByTagName('input')[0].checked){
                tr[i].className='on';
                selected+=parseInt(tr[i].getElementsByTagName('input')[1].value);
                price+=parseFloat(tr[i].cells[4].innerHTML);                            //cell存放所有td
                HTMLstr+='<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"><span class="del"  index="'+i+'">取消选择</span></div>'   //添加图片的代码
            }
            else{
                tr[i].className='';
            }
        }
        selectedTotal.innerHTML=selected;
        priceTotal.innerHTML=price.toFixed(2);
        selectedViewList.innerHTML=HTMLstr;
        if(selected==0){
            foot.className='foot';
        }
    }

    function getSubTotal(tr){                               //计算加减号产生的价格变动
        var tds=tr.cells;
        var price=parseFloat(tds[2].innerHTML);
        var count=parseInt(tr.getElementsByTagName('input')[1].value);
        var SubTotal=(count*price).toFixed(2);
        tds[4].innerHTML=""+SubTotal+"";
    }

    for(var i=0,len=checkInputs.length;i<len;i++){                      //给单选框循环绑定事件
        checkInputs[i].onclick=function(){
            if(this.className==='check-all check'){                  //判断是否是全选框
                for(var j=0;j<checkInputs.length;j++){
                    checkInputs[j].checked=this.checked;
                }
            }
            if(this.checked==false){
                checkAllInputs[0].checked=false;
                checkAllInputs[1].checked=false;
            }

            getTotal();
    }
    }

   for(var i=0,len=add.length;i<len;i++){                       //给商品添加按钮绑定事件
        add[i].onclick=function(){
        }
   }
   
   selected.onclick=function(){                             //展开或收起已选商品显示栏
       if(foot.className=='foot'){
           if(selectedTotal.innerHTML!=0)
             foot.className='foot show';
       }
       else{
           foot.className='foot';
       }
   }

   selectedViewList.onclick=function(e){                    //点击取消图片以及选择按钮发生变化
    
        e=e||window.event;
       var el=e.srcElement;
       if(el.className=='del'){
           var index=el.getAttribute('index');
           var input=tr[index].getElementsByTagName('input')[0];
           input.checked=false;
           input.onclick();                 //根据单选框的勾选情况（亮点）
       }
   }

   for(var i=0;i<tr.length;i++){                            //增加（减少）商品数量

       tr[i].onclick=function(e){
           e=e||window.event;
           var el=e.srcElement;
           var cls=el.className;
           alert(el);
           var input=this.getElementsByTagName('input')[1];
           var val=parseInt(input.value);
           var reduce=this.getElementsByTagName('span')[1];
           switch(cls){
               case 'add':
                    input.value=val+1;
                    reduce.innerHTML='-';
                    getSubTotal(this);
                    break;
               case 'reduce':
                    if(input.value>1){
                        input.value=val-1;
                    }
                    if(input.value<=1){
                         reduce.innerHTML='';
                    }
                    getSubTotal(this);
                    break;
                case 'delete':
                    var conf=confirm('确定要删除吗？');
                    if(conf){
                        this.parentNode.removeChild(this);
                    }
                    break;
          }
          getTotal();
       }
   }

   for(var i=0;i<tr.length;i++){                            //输入商品数量
        tr[i].getElementsByTagName('input')[1].onkeyup=function(){
            var val=parseInt(this.value);
            var tr=this.parentNode.parentNode;
            var reduce=tr.getElementsByTagName('span')[1];
            if(isNaN(val)||val<1){
                val=1;
            }
            this.value=val;
            if(val<=1){
                reduce.innerHTML='';
            }
            else{
                reduce.innerHTML='-';
            }
            getSubTotal(tr);
            getTotal();
        }
   }
   deleteAll.onclick=function(){            //删除多件
       if(selectedTotal.innerHTML!=0){
       var conf=confirm('确定删除吗？');
       if(conf){
       for(var i=0;i<tr.length;i++){
           var input=tr[i].getElementsByTagName('input')[0];
           if(input.checked){
               tr[i].parentNode.removeChild(tr[i]);
              i--;
           }
       }
    }
   }
   getTotal();
}

    checkAllInputs[0].checked=true;         //使默认为全选
    checkAllInputs[0].onclick();
}