

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  CheckBox,
} from 'react-native';
import leftTop from '../assets/homepage/1.png';
import rightTop from '../assets/homepage/3.png';
import rightBottom from '../assets/homepage/2.png';
import leftBottom from '../assets/homepage/4.png';
import midIMG from '../assets/homepage/5.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";
import {connect, useDispatch} from 'react-redux';
import {
  fontSizeEngAction,
  fontSizeArAction,
  changeViewMode,
} from '../../redux/actions/surahAction';

import types from '../../redux/constants'


const ModalSurahName = ({setSurahModel}) => {
  let navigation = useNavigation();

  return (
    <>
      <View style={styles.dialogueSurahName}>
        <View
          style={{
            height: 40,
            backgroundColor: '#146199',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => setSurahModel(false)}>
            <IconAntDesign
              name="close"
              size={20}
              color="white"
              style={{marginRight: 10, fontWeight: '700'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#146199',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text selectable style={{fontSize: 18, color: 'white', fontWeight: '700'}}>
              Select Translation Language In{' '}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#146199',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 10,
                paddingHorizontal: 15,
                borderRadius: 25,
              }}
              onPress={() => navigation.navigate('Translation', {lang: 'eng'})}>
              <Text selectable style={{fontSize: 14, color: '#146199'}}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 25,
              }}
              onPress={() =>
                navigation.navigate('Translation', {lang: 'urdu'})
              }>
              <Text selectable style={{fontSize: 14, color: '#146199'}}>Urdu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const HomePage = ({
  navigation,
  fontSizeEng,
  fontSizeAr,
  fullView,
  onlyArabic,
  arabicinTwoLines,
  onlyTranslation,
  onlyUduTranslation
}) => {

  const [isOnlyUrduTranslation, setOnlyUrduTranslation] = useState(false);
  const [arabicSize, setArabicSize] = useState(1);
  const [translationSize, setTranslationSize] = useState(1);
  const [surahModel, setSurahModel] = useState(false);
  const [
    isOnlyTranslation,
    setOnlyTranslation,
  ] = useState(false);
  const [isOnlyArabic, setOnlyArabic] = useState(false);
  const [isOnlyFullView, setFullView] = useState(false);

  const checkBoxArr = [
    {
      title: 'Full View',
      value: isOnlyFullView,
      onValueChange: changeModeView,
      modeOF: types.FULL_VIEW
    },
    {
      title: 'Only Arabic complete surah',
      value: isOnlyArabic,
      onValueChange: changeModeView,
      modeOF: types.ARABIC_MODE
    },
    {
      title: 'Only Translation ',
      value: isOnlyTranslation,
      onValueChange: changeModeView,
      modeOF: types.TRANSLATION_MODE
    },
  ];

  let dispatch = useDispatch();
  useEffect(() => {
    setArabicSize(fontSizeAr);
    setTranslationSize(fontSizeEng);
    setOnlyArabic(onlyArabic)
    setFullView(fullView)
    setOnlyUrduTranslation(onlyUduTranslation)
    setOnlyTranslation(onlyTranslation)
  }, [
    fontSizeAr,
    fontSizeEng,
    fullView,
    onlyArabic,
    arabicinTwoLines,
    onlyTranslation,
    onlyUduTranslation
  ]);

  let changeModeView = (value,forMode)=>{
    dispatch(changeViewMode(value,forMode))
  }



  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <Interstitial navigation={navigation} />
      <Banner />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}
          <View style={styles.mostOuter}>
            <View style={styles.topSection}>
              <TouchableOpacity
                style={{backgroundColor: 'black', borderRadius: 25}}
                onPress={() => setSurahModel(true)}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '700',
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                  }}>
                  Select Qari for Translation
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  borderRadius: 25,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '700',
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                  }}
                  onPress={() => navigation.navigate('Settings')}>
                  Select Voice for Translation
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '700',
                  marginTop: height * 0.03,
                  paddingHorizontal: 12,
                }}>
                View Mode :-
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              {checkBoxArr.map((item, key) => (
                <View style={styles.checkboxContainer} key={key}>
                  <CheckBox
                    value={item.value}
                    onValueChange={()=> changeModeView(item.value, item.modeOF)}
                    style={styles.checkbox}
                  />
                  <Text selectable style={styles.label}>{item.title}</Text>
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.037,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Font Size
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text selectable style={{fontSize: 23, fontWeight: '700', flex: 0.7}}>
                Arabic
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeArAction(arabicSize - 1));
                  }}>
                  <Icon
                    name="minus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 25,
                      fontWeight: '700',
                      paddingHorizontal: 10,
                    }}>
                    {arabicSize}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeArAction(arabicSize + 1));
                  }}>
                  <Icon
                    name="plus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.03,
                marginBottom: height * 0.025,
              }}>
              <Text selectable style={{fontSize: 23, fontWeight: '700', flex: 0.7}}>
                Translation
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeEngAction(translationSize - 1));
                  }}>
                  <Icon
                    name="minus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 25,
                      fontWeight: '700',
                      paddingHorizontal: 10,
                    }}>
                    {translationSize}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeEngAction(translationSize + 1));
                  }}>
                  <Icon
                    name="plus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.075,
              }}>
          <TouchableOpacity onPress={()=> navigation.navigate("Al_Fatiha_Layout")}>
                <Image source={require('../assets/common/3.jpg')} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {surahModel ? (
          <ModalSurahName
            surahModel={surahModel}
            setSurahModel={setSurahModel}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  mostOuter: {
    backgroundColor: '#ffffff',
    height: height * 0.92,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    height: 25,
    width: 25,
    flex: 0.1,
    marginLeft: width * 0.15,
  },
  label: {
    margin: 8,
    fontSize: 14,
    flex: 1,
  },
  plusBtn: {
    paddingHorizontal: 4,
    backgroundColor: '#146199',
  },
  plusTxt: {
    color: 'white',
    fontSize: 25,
    fontWeight: '800',
  },
  dialogueSurahName: {
    backgroundColor: 'white',
    height: 150,
    width: 280,
    position: 'absolute',
    elevation: 10,
    zIndex: 20,
    top: height * 0.2,
    left: width * 0.12,
  },
  topSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
});
let mapStatetoProps = (state) => {
  console.log(state.SurahReducer.fontSizeAR);
  return {
    fontSizeEng: state.SurahReducer.fontSizeEng,
    fontSizeAr: state.SurahReducer.fontSizeAR,
    fullView: state.ViewMode.fullView,
    onlyArabic: state.ViewMode.onlyArabic,
    arabicinTwoLines: state.ViewMode.arabicinTwoLines,
    onlyTranslation: state.ViewMode.onlyTranslation,
    onlyUduTranslation: state.ViewMode.onlyUduTranslation,
  };
};

export default connect(mapStatetoProps, null)(HomePage);
