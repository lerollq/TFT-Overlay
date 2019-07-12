import { createSelector } from "reselect";
import { IconState } from "./types";

export const getIconImageFromName = createSelector(
  (state:IconState, baseName:string) => state.icons.find(p => p.name === baseName),
  icon => icon ? icon.image : null,
)