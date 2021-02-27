import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {changeFontColor} from '../../redux/actions/surahAction';
import {useDispatch, useSelector} from 'react-redux';

import CheckBox from 'react-native-check-box';
import types from '../../redux/constants';
 
import {changeViewMode} from '../../redux/actions/surahAction';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const ModalLayout = () => {
  let dispatch = useDispatch();
  const colors = [
    '#FB1D1C',
    '#1C8CFB',
    '#1DFB8C',
    '#AAFA1B',
    '#D9A9A9',
    '#F4FA1C',
  ];
  const colors2 = [
    '#FB1BEB',
    '#1C3AFC',
    '#FA1C67',
    '#0E0A09',
    '#1DFB1C',
    '#1D75FB',
  ];
  const colors3 = [
    '#FBB11C',
    '#FB1C99',
    '#6D1DFB',
    '#FB1DB2',
    '#132004',
    '#533B0D',
  ];
  const colors4 = [
    '#536011',
    '#EF8BEC',
    '#942FB1',
    '#D097DB',
    '#FDB1B1',
    '#E0E189',
  ];

  const [isOnlyTranslation, setOnlyTranslation] = useState(false);
  const [isOnlyArabic, setOnlyArabic] = useState(false);
  const [isOnlyFullView, setFullView] = useState(false);
  const [isSplitView, setSplitView] = useState(false);

  const checkBoxArr = [
    {
      title: 'Full View',
      value: isOnlyFullView,
      onValueChange: (value, forMode) => {
        dispatch(changeViewMode(value, forMode));
      },
      modeOF: types.FULL_VIEW,
    },
    {
      title: 'Only Translation ',
      value: isOnlyTranslation,
      onValueChange: (value, forMode) => {
        dispatch(changeViewMode(value, forMode));
      },
      modeOF: types.TRANSLATION_MODE,
    },
    {
      title: 'Only Arabic complete surah',
      value: isOnlyArabic,
      onValueChange: (value, forMode) => {
        dispatch(changeViewMode(value, forMode));
      },
      modeOF: types.ARABIC_MODE,
    },
    {
      title: 'Split View',
      value: isSplitView,
      onValueChange: (value, forMode) => {
        dispatch(changeViewMode(value, forMode));
      },
      modeOF: types.SPLIT_VIEW,
    },
  ];

  let onlyArabic = useSelector((state) => state.ViewMode.onlyArabic);
  let arabicinTwoLines = useSelector(
    (state) => state.ViewMode.arabicinTwoLines,
  );
  let fullView = useSelector((state) => state.ViewMode.fullView);
  let onlyTranslation = useSelector((state) => state.ViewMode.onlyTranslation);
  let splitView = useSelector((state) => state.ViewMode.splitView);

  useEffect(() => {
    setOnlyArabic(onlyArabic);
    setFullView(fullView);
    setOnlyTranslation(onlyTranslation);
    setSplitView(splitView);
  }, [fullView, onlyArabic, arabicinTwoLines, onlyTranslation,splitView]);

  return (
    <>
      <View style={styles.dialogueLayout}>
        <View
          style={{
            position: 'absolute',
            bottom: -27,
            elevation: 20,
            left: width * 0.05,
          }}>
          <IconAntDesign
            name="caretdown"
            size={40}
            color="white"
            style={{elevation: 10}}
          />
        </View>
        <View
          style={{
            height: 40,
            backgroundColor: '#146199',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: 12}}>
            Change Layout and Color
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            marginHorizontal: 15,
            marginVertical: 10,
            alignItems: 'center',
            borderRadius: 25,
          }}>
          <Text
            selectable
            style={{fontSize: 14, color: 'white', paddingVertical: 5}}>
            Select Layout
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 0, flexDirection: 'column'}}>
          {checkBoxArr.map((item, key) => (
            <TouchableOpacity
              style={styles.checkboxContainer}
              key={key}
              onPress={(evt) => {
                // console.log('worksss');
                dispatch(changeViewMode(item.value, item.modeOF));
              }}
              >
              <CheckBox
                onClick={(evt) => {
                  // dispatch(changeViewMode(item.value, item.forMode));
                }}
                style={styles.checkbox}
                checkBoxColor="#146199"
                isChecked={item.value}
              />
              <Text style={styles.label}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            marginHorizontal: 15,
            marginVertical: 10,
            alignItems: 'center',
            borderRadius: 25,
          }}>
          <Text
            selectable
            style={{fontSize: 14, color: 'white', paddingVertical: 5}}>
            Select Color
          </Text>
        </TouchableOpacity>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-around',
              marginBottom: 5,
            }}>
            {colors.map((item, key) => (
              <TouchableOpacity
                onPress={() => dispatch(changeFontColor(item))}
                style={{height: 18, width: 18, backgroundColor: item}}
                key={key}></TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-around',
              marginBottom: 5,
            }}>
            {colors2.map((item, key) => (
              <TouchableOpacity
                onPress={() => dispatch(changeFontColor(item))}
                style={{height: 18, width: 18, backgroundColor: item}}
                key={key}></TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-around',
              marginBottom: 5,
            }}>
            {colors3.map((item, key) => (
              <TouchableOpacity
                onPress={() => dispatch(changeFontColor(item))}
                style={{height: 18, width: 18, backgroundColor: item}}
                key={key}></TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-around',
            }}>
            {colors4.map((item, key) => (
              <TouchableOpacity
                onPress={() => dispatch(changeFontColor(item))}
                style={{height: 18, width: 18, backgroundColor: item}}
                key={key}></TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* <View
          style={{
            height: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="chevron-down" size={30} color="#146199" />
        </View> */}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  dialogueLayout: {
    backgroundColor: 'white',
    height: 350,
    width: 230,
    position: 'absolute',
    elevation: 10,
    zIndex: 20,
    left: width * 0.2,
    bottom: '12%',
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 5,
    // justifyContent: 'flex-start',
  },
  checkbox: {
    alignSelf: 'center',
    height: 15,
    width: 25,
    flex: 0.1,
    marginLeft: 2,
    marginBottom: 4,
    marginRight: 20,
  },
  label: {
    // marginLeft: 25,
    fontSize: 11,
    // backgroundColor:'red'
  },
});

export default ModalLayout;
