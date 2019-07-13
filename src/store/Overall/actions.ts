import { fetchItems } from '../Items/actions';
import { fetchIcons } from "../Icons/actions";

import { ThunkAction } from 'redux-thunk';
import { AppState } from '../';
import { Action } from 'redux';
import { SET_VIEW, State, SET_STATE, OverallActionsType, Views, CLOSE_VIEW } from './types';
const { remote, ipcRenderer } = window.require("electron");

export const fetchData = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  return Promise.all([
    dispatch(fetchItems()),
    dispatch(fetchIcons()),
  ])
  .then(res => dispatch({
    type:SET_STATE,
    payload: State.IS_READY
  }))
  .catch(err => dispatch({
    type:SET_STATE,
    payload: State.IS_LOADING
  }));
}

export const setView = (view:Views): OverallActionsType => {
  return ({
    type: SET_VIEW,
    payload: view,
  })
}

export const closeView = (): OverallActionsType => {
  return ({
    type: CLOSE_VIEW,
    payload:null
  })
}

export const closeApp = () => {
  remote.app.quit();
  return;
}

export const setIgnoreMouseEvent = (bool:boolean, id:string | undefined) => {
  ipcRenderer.send('set-ignore-mouse-events',  bool, id);
  return {};
}
