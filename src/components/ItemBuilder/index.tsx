import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { AppState } from '../../store';
import { getBaseItems } from '../../store/Items/selectors';
import { Item } from '../../store/Items/types';
import ItemHoverable from '../ItemHoverable';
import ListAvailableItems from './ListAvailableItems';
import Stack from './Stack';


class ItemBuilder extends React.Component<ItemBuilderProps> {

  state:ItemBuilderState = {}

  componentDidMount() {
    let items:ItemBuilderState = {};
    this.props.baseItems.map((item, idx) =>  {
      items[item.name] = 0;
    });
    this.setState(items);
  }

  incrementItem = (baseName:string):void => {
    if (Object.keys(this.state).includes(baseName)) {
      this.setState({
        [baseName]: this.state[baseName] += 1,
      })  
    }
  }

  decrementItem = (baseName:string) => {
    if (Object.keys(this.state).includes(baseName) && this.state[baseName] >= 1) {
      let newValue = this.state[baseName] -= 1;
      this.setState({
        [baseName]: newValue,
      })  
    }
  }

  render() {
    return (
      <div style={{display:"flex"}}>
        <Stack decrementItem={this.decrementItem} incrementItem={this.incrementItem} stack={this.state}/>
        <ListAvailableItems stack={this.state}/>
      </div>
    )  
  }
}

const mapStateToProps = (state:AppState) => {
  return {
    baseItems: getBaseItems(state.items),
  }
}

export default connect(mapStateToProps)(ItemBuilder);