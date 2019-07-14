import React from "react";
import { connect } from "react-redux";
import { getBaseItemsName } from "../../store/Items/selectors";
import { AppState } from "../../store";
import ItemHoverable from "../ItemHoverable";
import ClickableElement from "../ClickableElement";

type StackProps = {
  incrementItem:Function,
  decrementItem:Function,
  resetStack:Function,
  stack:ItemBuilderState,
}

const Stack = ({stack, incrementItem, decrementItem, resetStack}:StackProps) => {
  return (
    <div className="stack-container">
      <h2>Stack</h2>
      <div className="stack-item-builder-container" >
          {
            Object.entries(stack).map(([key, value], idx) => 
              <div key={idx} className="stack-item-builder-row">
                <ClickableElement>
                  <i className="fas fa-minus-circle" onClick={() => decrementItem(key)} style={{ fontSize:'20px'}}/>
                </ClickableElement>
                  <ItemHoverable baseName={key} />
                  <span> : {stack[key]} </span>
                <ClickableElement>
                  <i className="fas fa-plus-circle" onClick={() => incrementItem(key)} style={{ fontSize:'20px'}}/>
                </ClickableElement>
              </div>
            )
          }
          <ClickableElement>
            <button type="button" onClick={()=>resetStack()}>Reset</button>
          </ClickableElement>        
        </div>
    </div>
  )
}

const mapStateToProps = (state:AppState) => {
  return {
    baseItems: getBaseItemsName(state.items),
  }
}

export default connect(mapStateToProps)(Stack);