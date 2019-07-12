import React, { Component } from 'react';
import { setIgnoreMouseEvent } from "../../store/Overall/actions";

class ClickableElement extends Component {
 
  state = {
    id:""
  }

  componentDidMount()  {
    const randomId = Math.random().toString(36).substring(10);
    this.setState({id: randomId}, () => {
      const currentId = randomId;
      const elem = document.getElementById(currentId);
      elem && elem.addEventListener('mouseenter', () => { setIgnoreMouseEvent(false, currentId) })
      elem && elem.addEventListener("mouseleave", ()=>{ setIgnoreMouseEvent(true, currentId) });  
    })
  }

  componentWillUnmount() {
    const currentId = this.state.id;
    const elem = document.getElementById(currentId);
    elem && elem.removeEventListener('mouseenter', ()=>{});
    elem && elem.removeEventListener('mouseleave', ()=>{});
  }

  render() {
    return  (
      <div id={this.state.id}>
          {this.props.children}
      </div>
    )
  }
}

export default ClickableElement;