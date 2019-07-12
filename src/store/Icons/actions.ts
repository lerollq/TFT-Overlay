import { SET_ICONS, Icon } from './types';
import { iconsEndpoint } from "../../constants/endpoint";
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../';
import { Action } from 'redux';

export const fetchIcons = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    const response:Array<Icon> = await(await fetch(iconsEndpoint)).json();
    dispatch({
      type:SET_ICONS,
      payload: {
        icons:response,
      }
    });  
}