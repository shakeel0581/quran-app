// import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import AllReducers from './reducers/rootReducer';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['SurahReducer']
// };

// const persistedReducer = persistReducer(persistConfig, AllReducers);



// export default () => {
//     let store = createStore(persistedReducer,applyMiddleware(thunk));
//     let persistor = persistStore(store);
//     return { store, persistor }
// }

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// Imports: Redux
import rootReducer from './reducers/rootReducer';
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    'SurahReducer',
    "ViewMode"
  ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk
  ),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {
  store,
  persistor,
};
