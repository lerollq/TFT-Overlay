import { ItemsActionsTypes, ItemsState, FETCH_ITEMS, SET_ITEMS } from "./types";

const initialState: ItemsState = {
  isLoading: false,
  items:[],
}

export function itemsReducer(state = initialState, action: ItemsActionsTypes):ItemsState {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    case SET_ITEMS:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        items: action.payload.items
      }
    default:
      return state;
  }
} 