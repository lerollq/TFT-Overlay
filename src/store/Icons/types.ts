export const SET_ICONS = "SET_ICONS";

export interface Icon {
  id?: object,
  name: string,
  image:string,
}

export interface IconState {
  icons:Icon[]
}

interface SetIconsData {
  type: typeof SET_ICONS
  payload: {
    icons: Icon[],
  }
}

export type IconsActionsTypes = SetIconsData;