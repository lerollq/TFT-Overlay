import React from 'react';
import { connect } from "react-redux";
import { AppState } from '../../store';
import { getBaseItems } from '../../store/Items/selectors';
import ListAvailableItems from './ListAvailableItems';
import Stack from './Stack';


class ItemBuilder extends React.Component<ItemBuilderProps> {

  state:ItemBuilderState = {}

  componentDidMount() {
    const localStacks = localStorage.getItem("stack");
    if (localStacks) {
      this.setState(JSON.parse(localStacks));
    } else {
      let items:ItemBuilderState = {};
      this.props.baseItems.forEach((item) =>  {
        items[item.name] = 0;
      });
      this.setState(items);  
    }
  }

  resetStack = () => {
    Object.keys(this.state).forEach((key) => {
      this.setState({
        [key]:0
      })
    })
  }

  updateLocalstorage = () => {
    localStorage.setItem("stack", JSON.stringify(this.state));
  }

  incrementItem = (baseName:string):void => {
    if (Object.keys(this.state).includes(baseName)) {
      this.setState({
        [baseName]: this.state[baseName] + 1,
      }, () => this.updateLocalstorage());

    }
  }

  decrementItem = (baseName:string) => {
    if (Object.keys(this.state).includes(baseName) && this.state[baseName] >= 1) {
      this.setState({
        [baseName]: this.state[baseName] - 1,
      }, () => this.updateLocalstorage());

    }
  }

  render() {
    return (
      <div style={{display:"flex"}}>
        <Stack decrementItem={this.decrementItem} incrementItem={this.incrementItem} stack={this.state} resetStack={this.resetStack}/>
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