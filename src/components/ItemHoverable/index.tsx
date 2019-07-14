import React from 'react';
import { connect } from "react-redux";
import { getStatsFromItemName, getDescriptionFromItemName, getRecipeFromItemName } from '../../store/Items/selectors';
import { AppState } from '../../store';
import ClickableElement from '../ClickableElement';
import ReactTooltip from 'react-tooltip';
import Icon from '../Icon';
import ItemImage from '../ItemImage';

type ItemHoverableProps = {
  baseName:string,
  description?:string,
  className?:string,
  onClick?:Function,
  stats?:{},
  recipe?:string[]
}

const ItemIHoverable = (
  {
    baseName,
    description="",
    recipe=[],
    onClick=() => {},
    stats={}
  }:ItemHoverableProps) => {
    const randomId = Math.random().toString(36).substring(10);
  return (
    <ClickableElement>
      <div data-tip data-for={`tooltip-${randomId}`} onClick={()=>onClick()}>
        <ItemImage baseName={baseName} />
      </div>
      <ReactTooltip id={`tooltip-${randomId}`} type="dark" place="top" className="tooltip">
        {<React.Fragment>

            <div className='tooltip-row'>
              <ItemImage baseName={baseName} size={20}/>
              <span>{baseName}</span>
            </div>

            {Object.keys(stats).length > 0 &&
              <div className="tooltip-row">
                {
                  Object.entries(stats).map(([key,value]) =>
                    <React.Fragment><Icon baseName={key} /> {value}</React.Fragment>  
                  )            
                }
              </div>
            }

            <div className="tooltip-row">
              <span>{description}</span>
            </div>
            {recipe.length > 0 &&
              <div className="tooltip-row">
                {recipe.map(item =>
                  <ItemImage baseName={item} size={20} />  
                )}
              </div>            
            }
          </React.Fragment>}
      </ReactTooltip>
    </ClickableElement>  )
}

const mapStateToProps = (state:AppState, ownProps:ItemHoverableProps) => {
  return {
    recipe: getRecipeFromItemName(state.items, ownProps.baseName),
    stats: getStatsFromItemName(state.items, ownProps.baseName),
    description: getDescriptionFromItemName(state.items, ownProps.baseName),
  }
}

export default connect(mapStateToProps)(ItemIHoverable);
