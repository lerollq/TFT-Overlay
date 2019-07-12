import React from 'react';
import BaseItems from "./BaseItems";
import CombinedItems from "./CombinedItems";

import './items.css';


class Items extends React.PureComponent {

  state = {
    item:""
  }

  toggleItemOnClick = (baseName:string) => {
    this.setState({
      item: baseName === this.state.item ? "" : baseName
    })
  }

  render(){
    const { item } = this.state;
    return (
    <div className="items-container">
      <BaseItems setItemOnClick={this.toggleItemOnClick} />
      {this.state.item && <CombinedItems baseName={item}/> }
    </div>
  )
  }
}

export default Items;