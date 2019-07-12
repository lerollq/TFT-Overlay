import { SET_ITEMS, Item } from './types';
import { itemsEndpoint } from "../../constants/endpoint";
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../';
import { Action } from 'redux';




export const fetchItems = (): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    const response:Array<Item> = await(await fetch(itemsEndpoint)).json();
    dispatch({
      type:SET_ITEMS,
      payload: {
        items:response,
        isLoading:false,
      }
    });  
}