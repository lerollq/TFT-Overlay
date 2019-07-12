import React from 'react';
import { connect } from "react-redux";
import { getCombinedItemsInto, getImageFromItemName } from "../../../store/Items/selectors";
import { AppState } from '../../../store';
import { Item } from '../../../store/Items/types';
import ItemHoverable from "../../ItemHoverable";

type CombinedItemsProps = {
  baseName: string,
  combinedItems?: Item[],
}

const CombinedItems = ({baseName, combinedItems}:CombinedItemsProps) => {
  return (
    
      <table>
        <thead>
          <tr>
            <td>Recipe</td>
            <td></td>
            <td>Combined Into</td>
          </tr>
        </thead>
        <tbody>
          {
            combinedItems &&
            combinedItems.map((item, idx) =>
              <tr key={idx}>

                <td className="combined-items-recipe">
                  {item.recipe && 
                    <React.Fragment>
                      <ItemHoverable baseName={baseName === item.recipe[0] ? item.recipe[0] : item.recipe[1]} />
                      <span> + </span>
                      <ItemHoverable baseName={baseName === item.recipe[1] ? item.recipe[0] : item.recipe[1]} />
                    </React.Fragment>
                  }
                </td>
                <td>==></td>
                <td className="combined-items-into">
                  <ItemHoverable baseName={item.name} />
                  <span>{item.description}</span>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>    
  )
}

const mapStateToProps = (state:AppState, ownProps:CombinedItemsProps) => {
  return {
    combinedItems: getCombinedItemsInto(state.items, ownProps.baseName)
  }
}

export default connect(mapStateToProps)(CombinedItems);