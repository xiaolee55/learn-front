import React,{Component } from 'react'
import ReactDom from 'react-dom'

export default class Child extends Component {
  render() {
    return (
      <div>
        <div>this is Child</div>
      </div>
    )
  }
}

ReactDom.render(<Child/>,document.getElementById("root"))