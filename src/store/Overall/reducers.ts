import { OverallState, OverallActionsType, SET_VIEW, State, SET_STATE, CLOSE_VIEW } from "./types";

const initialState: OverallState = {
  state: State.IS_LOADING,
  view: null,
}

export function overallReducer(state = initialState, actions:OverallActionsType):OverallState {
  console.log("==>", actions.type);
  switch(actions.type) {
    case SET_VIEW:
      return {
        ...state,
        view: state.view === actions.payload ? null : actions.payload,
      };
    case CLOSE_VIEW:
        return {
          ...state,
          view: null,
        };
    case SET_STATE: {
      return {
        ...state,
        state: actions.payload
      }
    }
    default:
      return state;
  }
}