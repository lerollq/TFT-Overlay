export enum State {
  "IS_LOADING",
  "IS_READY",
}

export enum Views {
  ITEMS = "ITEMS",
  ITEM_BUILDER = "ITEM_BUILDER"
}

export interface OverallState {
  state: State,
  view: Views | null,
}

export const SET_VIEW = "SET_VIEW";
export const SET_STATE = "SET_STATE";
export const CLOSE_VIEW = "CLOSE_VIEW";

interface SetView {
  type: typeof SET_VIEW,
  payload: Views,
}

interface CloseView {
  type: typeof CLOSE_VIEW,
  payload:null,
}

interface SetState {
  type: typeof SET_STATE,
  payload: State,
}

export type OverallActionsType = SetView | SetState | CloseView;