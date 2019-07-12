import { createSelector } from "reselect";
import { AppState } from "..";
import { ItemsState, Item } from "./types";

export const getBaseItems = createSelector(
  (state:ItemsState) => state.items,
  items => {
    return items.filter(p => p.type === "BASE")
  }
)

export const getBaseItemsName = createSelector(
  (state:ItemsState) => state.items,
  items => {
    return items.filter(p => p.type === "BASE").map(item => item.name)
  }
)

export const getCombinedItems = createSelector(
  (state:ItemsState) => state.items,
  items => {
    return items.filter(p => p.type === "COMBINED")
  }
)

export const getCombinedItemsInto = createSelector(
  (state:ItemsState, baseName:string) => state.items.filter(item => item.type === "COMBINED" && item.recipe && item.recipe.indexOf(baseName) !== -1),
  items => items
)

export const getImageFromItemName = createSelector(
  (state:ItemsState, baseName: string) => state.items.find(p => p.name === baseName),
    item => item ? item.image : ""
)

export const getStatsFromItemName = createSelector(
  (state:ItemsState, baseName: string) => state.items.find(p => p.name === baseName),
  item => item ? item.stats : {}
)

export const getDescriptionFromItemName = createSelector(
  (state:ItemsState, baseName: string) => state.items.find(p => p.name === baseName),
  item => item ? item.description : ""
)

export const getRecipeFromItemName = createSelector(
  (state:ItemsState, baseName: string) => state.items.find(p => p.name === baseName),
  item => item ? item.recipe : []
)

export const getCombinedItemsFromCurrentStack = (state:ItemsState, stack:ItemBuilderState) => {
  const combinedItems = state.items.filter(item => item.type === "COMBINED");
  const combination:string[] = [];

  combinedItems.forEach(combinedItem => {
    const countItem:any = {};

    combinedItem.recipe && combinedItem.recipe.map((key, idx) => {
      countItem[key] = Object.keys(countItem).includes(key) ? countItem[key] += 1: 1;
    });

    if (Object.keys(countItem).every((key, value) => stack[key] >= countItem[key])) {
      combination.push(combinedItem.name);
    }
  })
  return combination
}

