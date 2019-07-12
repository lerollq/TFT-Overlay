export interface Item {
  id?: object,
  name: string,
  description:string,
  type: "BASE" | "COMBINED",
  stats: {
    [key:string]:string,
  },
  recipe?: [string, string]
  tier: number,
  image:string,
}

export const FETCH_ITEMS = "FETCH_ITEMS";
export const SET_ITEMS = "SET_ITEMS";

export interface ItemsState {
  isLoading: boolean,
  items: Item[],
}

interface FetchItemsData {
  type: typeof FETCH_ITEMS
  payload: {
    isLoading: boolean,
  },
}

interface SetItemsData {
  type: typeof SET_ITEMS
  payload: {
    items: Item[],
    isLoading: boolean,
  }
}

export type ItemsActionsTypes = FetchItemsData | SetItemsData;