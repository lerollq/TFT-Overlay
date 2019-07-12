import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { itemsReducer } from "./Items/reducers";
import { overallReducer } from "./Overall/reducers";
import { iconsReducer } from "./Icons/reducers";

const rootReducer = combineReducers({
  items: itemsReducer,  
  overall: overallReducer,
  icons:iconsReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  )
  return store;
}