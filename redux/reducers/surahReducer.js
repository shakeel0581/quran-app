import types from '../constants';

let initstate = {
  all_surah: [],
  all_surah_error: false,
  translationUr: 'ur.ahmedali',
  translationEng: 'en.asad',
  fontSizeAR: 24,
  fontSizeEng: 14,
  surah_ayah_eng: [],
  surah_ayah_arabic: [],
  fontFamily: '_PDMS_Saleem_QuranFont',
  bookmarkAyahList: [],
  bookmarkSurahList: [],
  fullView: true,
  onlyArabic: false,
  arabicinTwoLines: false,
  onlyTranslation: false,
  appLanguage: 'en',
  ayahsTobeCompare: [],
};

export default function (state = initstate, action) {
  let {type, payload} = action;
  switch (type) {
    case types.GET_ALL_SURAHS:
      return {...state, all_surah: payload};
    case types.INTERNET_ERROR:
      return {
        ...state,
        all_surah_error: payload,
      };
    case types.GET_ALL_SURAH_AYAH_IN_ENG:
      return {
        ...state,
        surah_ayah_eng: payload,
      };
    case types.GET_ALL_SURAH_AYAH_IN_ARABIC:
      return {
        ...state,
        surah_ayah_arabic: payload,
      };
    case types.FONT_FAMILY_NAME:
      return {
        ...state,
        fontFamily: payload,
      };
    case types.QURAN_TRANSLATION_URDU:
      return {
        ...state,
        translationUr: payload,
      };
    case types.QURAN_TRANSLATION_ENG:
      return {
        ...state,
        translationEng: payload,
      };
    case types.FONT_SIZE_ENGLISH:
      return {
        ...state,
        fontSizeEng: payload,
      };
    case types.FONT_SIZE_ARABIC:
      return {
        ...state,
        fontSizeAR: payload,
      };
    case types.SAVED_BOOKMARK:
      return {
        ...state,
        bookmarkAyahList: [...state.bookmarkAyahList, payload],
      };
    case types.SAVED_BOOKMARK_SURAH:
      return {
        ...state,
        bookmarkSurahList: [...state.bookmarkSurahList, payload],
      };
    case types.REMOVE_BOOKMARK:
      let newArr = state.bookmarkAyahList.filter((item, key) => {
        return key !== payload;
      });
      return {
        ...state,
        bookmarkAyahList: [...newArr],
      };
    case types.REMOVE_BOOKMARK_SURAH:
      let newArrSurah = state.bookmarkSurahList.filter((item, key) => {
        return key !== payload;
      });
      return {
        ...state,
        bookmarkSurahList: [...newArrSurah],
      };
    case types.CHANGE_APP_LANGUAGE:
      return {
        ...state,
        appLanguage: payload,
      };

    case types.AYAHS_TO_COMPARE:
      return {
        ...state,
        ayahsTobeCompare: [...payload],
      };
    case types.AYAHS_TO_COMPARE_AFTER_SOTRING:
      return {
        ...state,
        ayahsTobeCompare: [...payload],
      };

    default:
      return state;
  }
}
