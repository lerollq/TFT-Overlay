import React from "react";
import { AppState } from "../../store";
import { getCombinedItemsFromCurrentStack } from "../../store/Items/selectors";
import { connect } from "react-redux";
import ItemHoverable from "../ItemHoverable";

type ListAvailableItemsProps = {
  stack: ItemBuilderState,
  availableItems?:string[]
}

const ListAvailableItems = ({availableItems}:ListAvailableItemsProps) => {
  return (
    <div className="stack-container">
      <h2>Available:</h2>
      <div className="available-item-builder-container">
        { availableItems && availableItems.map(item =>
            <ItemHoverable baseName={item} />        
          )}
      </div>
    </div>
  )
}


const mapStateToProps = (state:AppState, ownProps:ListAvailableItemsProps) => {
  return {
    availableItems: getCombinedItemsFromCurrentStack(state.items, ownProps.stack),
  }
}

export default connect(mapStateToProps)(ListAvailableItems);