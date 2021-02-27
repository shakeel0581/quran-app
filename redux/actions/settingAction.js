import axios from 'axios';
import types from '../constants';

export const showAllOptionAction = (value) => async (dispatch) => {
  try {
    dispatch({
      type: types.SHOW_ALL_OPTIONS,
      payload: value,
    });
  } catch (error) {
    console.log(error);
  }
};
export const changeCityNameForNamaz = (value) => async (dispatch) => {
  try {
    dispatch({
      type: types.CITY_NAME_FOR_NAMAZ,
      payload: value,
    });
  } catch (error) {
    console.log(error);
  }
};
export const changeViewBorderBottom = (value) => async (dispatch) => {
  try {
    dispatch({
      type: types.SHOW_BOTTOM_BORDER,
    });
  } catch (error) {
    console.log(error);
  }
};
