import React from "react";
import { Item } from "../../../store/Items/types";
import { getBaseItems } from "../../../store/Items/selectors";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import ItemHoverable from "../../ItemHoverable";

type BaseItemsProps = {
  items:Item[],
  setItemOnClick: Function,
}

const BaseItems = ({items, setItemOnClick}:BaseItemsProps) => {
  return (
      <table>
        <thead>
          <tr>
            <td><h2>Base Items </h2></td>
          </tr>
        </thead>
        <tbody>

          {
            items && items.map((item, idx) =>
              <tr key={idx}>
                <td className="base-item">
                    <ItemHoverable baseName={item.name} onClick={()=>setItemOnClick(item.name)}/>
                </td>
              </tr>
            )
          }

        </tbody>
      </table>
  )
}

const mapStateToProps = (state:AppState) => {
  return {
    items: getBaseItems(state.items)
  }
}

export default connect(mapStateToProps)(BaseItems)