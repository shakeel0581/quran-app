import axios from 'axios';
import types from '../constants';

export const getAllSurah = () => async (dispatch) => {
  try {
    let result = await axios.get('https://api.alquran.cloud/v1/surah');
    if (result.data.code === 200) {
      dispatch({
        type: types.GET_ALL_SURAHS,
        payload: result.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.INTERNET_ERROR,
      payload: 'Error',
    });
  }
};

export const getSurahAyahInEng = (surahNumber, translationEng) => async (
  dispatch,
) => {
  try {
    let result = await axios.get(
      'https://api.alquran.cloud/v1/surah/' + surahNumber + '/' + translationEng,
    );
    if (result.data.code === 200) {
      dispatch({
        type: types.GET_ALL_SURAH_AYAH_IN_ENG,
        payload: result.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.INTERNET_ERROR,
      payload: 'Error',
    });
  }
};

export const getSurahAyahInArabi = (surahNumber) => async (dispatch) => {
  axios
    .get('https://api.alquran.cloud/v1/surah/' + surahNumber)
    .then((result) => {
      // console.log(result.data.data);
      if (result.data.code === 200) {
        dispatch({
          type: types.GET_ALL_SURAH_AYAH_IN_ARABIC,
          payload: result.data.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: types.INTERNET_ERROR,
        payload: 'Error',
      });
    });
};
export const quranicLanguage = (fontName) => async (dispatch) => {
  dispatch({
    type: types.FONT_FAMILY_NAME,
    payload: fontName,
  });
};
export const quranTranslationUr = (translation) => async (dispatch) => {
  dispatch({
    type: types.QURAN_TRANSLATION_URDU,
    payload: translation,
  });
};
export const quranTranslationEng = (translation) => async (dispatch) => {
  dispatch({
    type: types.QURAN_TRANSLATION_ENG,
    payload: translation,
  });
};
export const fontSizeArAction = (translation) => async (dispatch) => {
  dispatch({
    type: types.FONT_SIZE_ARABIC,
    payload: translation,
  });
};
export const fontSizeEngAction = (translation) => async (dispatch) => {
  dispatch({
    type: types.FONT_SIZE_ENGLISH,
    payload: translation,
  });
};

export const saveBookMarks = (savedAyah) => async (dispatch) => {

  dispatch({
    type: types.SAVED_BOOKMARK,
    payload: savedAyah,
  });
};
export const removeBookMark = (key) => async (dispatch) => {
  dispatch({
    type: types.REMOVE_BOOKMARK,
    payload: key,
  });
};
export const saveBookMarksSurah = (savedSurah) => async (dispatch) => {
  console.log(savedSurah);
  dispatch({
    type: types.SAVED_BOOKMARK_SURAH,
    payload: savedSurah,
  });
};
export const removeBookMarkSurah = (key) => async (dispatch) => {
  dispatch({
    type: types.REMOVE_BOOKMARK_SURAH,
    payload: key,
  });
};
export const changeViewMode = (key, modename) => async (dispatch) => {
  switch (modename) {
    case types.FULL_VIEW:
      dispatch({
        type: types.FULL_VIEW,
        payload: key,
      });
      break;
    case types.ARABIC_MODE:
      dispatch({
        type: types.ARABIC_MODE,
        payload: key,
      });
      break;
    case types.ARABIC_IN_TWO:
      dispatch({
        type: types.ARABIC_IN_TWO,
        payload: key,
      });
      break;
    case types.TRANSLATION_MODE:
      dispatch({
        type: types.TRANSLATION_MODE,
        payload: key,
      });
      break;
    case types.ONLY_URDU_TRANSLATION:
      dispatch({
        type: types.ONLY_URDU_TRANSLATION,
        payload: key,
      });
      break;
    case types.SPLIT_VIEW:
      dispatch({
        type: types.SPLIT_VIEW,
        payload: key,
      });
      break;

    default:
      break;
  }
};

export const changeAppLanguage = (key) => async (dispatch) => {
  dispatch({
    type: types.CHANGE_APP_LANGUAGE,
    payload: key,
  });
};

export const versesForCompare = (array) => async (dispatch) => {
  // console.log(array);
  dispatch({
    type: types.AYAHS_TO_COMPARE,
    payload: array,
  });
};
export const clearVersesList = () => async (dispatch) => {
  dispatch({
    type: types.CLEAR_LIST_V_2,
  });
};
export const getCompareVerses1 = (number, selectedValue1) => async (
  dispatch,
) => {
  try {
    let result = await axios.get(
      `https://api.alquran.cloud/v1/ayah/${number}/${selectedValue1}`,
    );
    // console.log(result.data.data);
    if (result.data.data) {
      dispatch({
        type: types.AYAHS_TO_COMPARE_LIST_1,
        payload: result.data.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCompareVerses2 = (number, selectedValue2) => async (
  dispatch,
) => {
  try {
    let result = await axios.get(
      `https://api.alquran.cloud/v1/ayah/${number}/${selectedValue2}`,
    );
    // console.log(result.data.data);
    if (result.data.data) {
      dispatch({
        type: types.AYAHS_TO_COMPARE_LIST_2,
        payload: result.data.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const sortVersesInCompare = (number) => async (dispatch) => {
  try {
    dispatch({
      type: types.VersesGoingToSort,
      payload: number,
    });
  } catch (error) {
    console.log(error);
  }
};
export const sortVersesInCompareAfterSorting = (number) => async (dispatch) => {
  try {
    dispatch({
      type: types.AYAHS_TO_COMPARE_AFTER_SOTRING,
      payload: number,
    });
  } catch (error) {
    console.log(error);
  }
};
export const sortToggleAyah = (array) => async (dispatch) => {
  try {
    dispatch({
      type: types.FILTER_VERSES,
      payload: array,
    });
  } catch (error) {
    console.log(error);
  }
};
export const changeFontColor = (color) => async (dispatch) => {
  try {
    dispatch({
      type: types.NEW_FONT_COLOR,
      payload: color,
    });
  } catch (error) {
    console.log(error);
  }
};
