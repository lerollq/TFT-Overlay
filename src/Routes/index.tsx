import React from 'react';
import { AppState } from '../store';
import { connect } from 'react-redux';

import Items from "../components/Items";
import ItemBuilder from "../components/ItemBuilder";
import { Views } from '../store/Overall/types';

type RoutesProps = {
  view: Views | null
}
const Routes =  ({view}: RoutesProps) => {
  switch(view) {
    case Views.ITEMS:
      return <Items/>;
    case Views.ITEM_BUILDER:
      return <ItemBuilder />
    default:
      return null;
  }
}


const mapStateToProps = (state:AppState) => {
  return {
    view: state.overall.view,
  }
}

export default connect(mapStateToProps)(Routes);