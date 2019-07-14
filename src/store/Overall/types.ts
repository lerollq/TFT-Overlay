export enum State {
  "IS_LOADING",
  "IS_READY",
}

export enum Views {
  ITEMS = "ITEMS",
  ITEM_BUILDER = "ITEM_BUILDER",
  SETTINGS = "SETTINGS",
  INFO="INFO",
}

export interface OverallInfoState {
  currentVersion:string,
  htmlUrl:string,
  latestVersion:string,
}

export interface OverallState {
  state: State,
  view: Views | null,
  info: OverallInfoState,

}

export const SET_VIEW = "SET_VIEW";
export const SET_STATE = "SET_STATE";
export const SET_GITHUB_VERSION = "SET_GITHUB_VERSION";
export const CLOSE_VIEW = "CLOSE_VIEW";

interface SetView {
  type: typeof SET_VIEW,
  payload: Views,
}

interface SetGithubVersion {
  type: typeof SET_GITHUB_VERSION,
  payload: {
    currentVersion: string,
    latestVersion:string,
    htmlUrl:string,
  },
}

interface CloseView {
  type: typeof CLOSE_VIEW,
  payload:null,
}

interface SetState {
  type: typeof SET_STATE,
  payload: State,
}

export type OverallActionsType = SetView | SetState | CloseView | SetGithubVersion;