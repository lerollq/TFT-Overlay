import React from 'react';
import { AppState } from '../store';
import { connect } from 'react-redux';

import Items from "../components/_ItemsView";
import ItemBuilder from "../components/_ItemBuilderView";
import Settings from "../components/_SettingsView";
import Info from "../components/_InfoView";

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
    case Views.SETTINGS:
      return <Settings />
    case Views.INFO:
        return <Info />
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