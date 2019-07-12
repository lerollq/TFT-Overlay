import { IconsActionsTypes, IconState, SET_ICONS } from "./types";

const initialState: IconState = {
  icons:[],
}

export function iconsReducer(state = initialState, action: IconsActionsTypes):IconState {
  switch (action.type) {
    case SET_ICONS:
      return {
        ...state,
        icons: action.payload.icons
      }
    default:
      return state;
  }
} 