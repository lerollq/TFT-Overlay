import { OverallState, OverallActionsType, SET_VIEW, State, SET_STATE, CLOSE_VIEW, SET_GITHUB_VERSION } from "./types";

const initialState: OverallState = {
  state: State.IS_LOADING,
  view: null,
  info: {
    currentVersion:"",
    htmlUrl:"",
    latestVersion:"",
  },
}

export function overallReducer(state = initialState, actions:OverallActionsType):OverallState {
  switch(actions.type) {
    case SET_VIEW:
      return {
        ...state,
        view: state.view === actions.payload ? null : actions.payload,
      };
    case SET_GITHUB_VERSION:
      return {
        ...state,
        info: actions.payload
      }
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