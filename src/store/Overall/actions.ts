import { fetchItems } from '../Items/actions';
import { fetchIcons } from "../Icons/actions";

import { ThunkAction } from 'redux-thunk';
import { AppState } from '../';
import { Action } from 'redux';
import { SET_VIEW, State, SET_STATE, OverallActionsType, Views, CLOSE_VIEW, SET_GITHUB_VERSION } from './types';
import { githubReleases } from '../../constants/endpoint';
const { remote, ipcRenderer, shell } = window.require("electron");

export const fetchData = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  return Promise.all([
    dispatch(fetchItems()),
    dispatch(fetchIcons()),
    dispatch(fetchGithubData()),
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

export const fetchGithubData = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const response:Array<any> = await(await fetch(githubReleases)).json();
  const currentVersion = remote.app.getVersion();
  return dispatch({
    type:SET_GITHUB_VERSION,
    payload: {
      currentVersion:currentVersion,
      latestVersion:response[0].tag_name,
      htmlUrl:response[0].html_url,
    }
  });  
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

export const openBrowserToUrl = (url:string):void => {
  shell.openExternal(url);
}

export const setIgnoreMouseEvent = (bool:boolean, id:string | undefined) => {
  ipcRenderer.send('set-ignore-mouse-events',  bool, id);
  return {};
}
