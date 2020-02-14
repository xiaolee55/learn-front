import React,{Component } from 'react'
import ReactDom from 'react-dom'
import Child from './child/child.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <div>this is App</div>
        <Child/>
      </div>
    )
  }
}

ReactDom.render(<App/>,document.getElementById("root"))
