import types from '../constants';

let initstate = {
  fullView: true,
  onlyArabic: false,
  onlyUduTranslation: false,
  onlyTranslation: false,
  splitView: false,
  versesList1: [],
  versesList2: [],
  markedVersesInCompare: [],
  filterMarkedVerses: [],
  currentFontColor: '#146199',
  showAllOptions: true,
  showBottomBorder: true,
  namazCity: 'Faisalabad',
};

export default function (state = initstate, action) {
  let {type, payload} = action;
  switch (type) {
    case types.TRANSLATION_MODE:
      return {
        ...state,
        onlyTranslation: true,
        onlyArabic: false,
        onlyUduTranslation: false,
        fullView: false,
        splitView: false,
      };
    case types.FULL_VIEW:
      return {
        ...state,
        fullView: true,
        onlyTranslation: false,
        onlyArabic: false,
        onlyUduTranslation: false,
        splitView: false,
      };
    case types.ARABIC_MODE:
      return {
        ...state,
        onlyArabic: true,
        fullView: false,
        onlyTranslation: false,
        onlyUduTranslation: false,
        splitView: false,
      };
    case types.SPLIT_VIEW:

      return {
        ...state,
        onlyUduTranslation: false,
        onlyArabic: false,
        fullView: false,
        onlyTranslation: false,
        splitView: true,

      };
    case types.AYAHS_TO_COMPARE_LIST_1:
      return {...state, versesList1: [...state.versesList1, payload]};
    case types.AYAHS_TO_COMPARE_LIST_2:
      return {...state, versesList2: [...state.versesList2, payload]};
    case types.CLEAR_LIST_V_2:
      return {...state, versesList2: [], versesList1: []};
    case types.VersesGoingToSort:
      console.log('markedVersesInCompare');
      console.log(payload);
      return {
        ...state,
        markedVersesInCompare: [...state.markedVersesInCompare, ...payload],
      };
    case types.FILTER_VERSES:
      console.log('payload');
      console.log(payload);
      return {
        ...state,
        filterMarkedVerses: payload,
      };
    case types.NEW_FONT_COLOR:
      return {
        ...state,
        currentFontColor: payload,
      };
    case types.SHOW_ALL_OPTIONS:
      return {
        ...state,
        showAllOptions: payload,
      };
    case types.CITY_NAME_FOR_NAMAZ:
      return {
        ...state,
        namazCity: payload,
      };
    case types.SHOW_BOTTOM_BORDER:
      return {
        ...state,
        showBottomBorder: !state.showBottomBorder,
      };
    default:
      return state;
  }
}
