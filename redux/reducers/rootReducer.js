import {combineReducers} from 'redux';
import SurahReducer from './surahReducer';
import ViewMode from './viewModeReducer';

let allReducer = {
  SurahReducer,
  ViewMode
};

let reducers = combineReducers(allReducer);

export default reducers;
