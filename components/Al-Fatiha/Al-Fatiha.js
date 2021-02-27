import React, {useState, useEffect} from 'react';
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
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import verse1 from '../assets/QuranRead/1.png';
import {
  getSurahAyahInArabi,
  getSurahAyahInEng,
  saveBookMarks,
  versesForCompare,
} from '../../redux/actions/surahAction';
import {connect, useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import CheckBox from 'react-native-check-box';
import Options from './Options';
import ShareModel from './ShareComponent';
import ModalFont from './ModalFont';
import ModalLayout from './ModalLayout';
import ModalVoice from './ModalVoice';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({
  route,
  fontFamilyName,
  fontSizeAR,
  fontSizeEng,
  fullView,
  onlyArabic,
  onlyTranslation,
  onlyUduTranslation,
  translationEng,
  appLanguage,
  translationUr,
  ayahsTobeCompare,
  currentFontColor,
  showAllOptions,
  splitView,
  navigation,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [surahModel, setSurahModel] = useState(false);
  const [layoutBox, setLayoutBox] = useState(false);
  // const [voiceModal, setVoiceModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [compareModal, setCompareModal] = useState(false);
  const [engAyahState, setEngAyah] = useState(false);
  const [arabicAyahState, setArabicAyah] = useState(false);
  const [selectedArabicAyahState, setSelectedArabicAyah] = useState(false);
  const [verseNo, setVerse] = useState(false);
  const [verseItem, setVerseItem] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(ayahsTobeCompare);
  const [isOptionView, setOptionsView] = useState(true);
  const [isBorderShow, setBorderShow] = useState(true);
  let isBorderViewable = useSelector(
    (state) => state.ViewMode.showBottomBorder,
  );

  let {surahNumber} = route.params;
  let dispatch = useDispatch();
  useEffect(() => {
    Axios.get('https://api.alquran.cloud/v1/surah/' + surahNumber).then(
      (result) => {
        setArabicAyah(result.data.data);
      },
    );
    let lang = appLanguage == 'en' ? translationEng : translationUr;
    Axios.get(
      'https://api.alquran.cloud/v1/surah/' + surahNumber + '/' + lang,
    ).then((result) => {
      // console.log('working here');
      setEngAyah(result.data.data);
    });
  }, []);

  const selectedVerse = (item, number) => {
    dispatch(versesForCompare(toggleCheckBox));
  };

  const isItemChecked = (abilityName) => {
    return toggleCheckBox.indexOf(abilityName) > -1;
  };

  const manageToggle = (evt, abilityName) => {
    if (isItemChecked(abilityName)) {
      setToggleCheckBox(toggleCheckBox.filter((i) => i !== abilityName));
    } else {
      setToggleCheckBox([...toggleCheckBox, abilityName]);
    }
  };
  useEffect(() => {
    selectedVerse();
    setOptionsView(showAllOptions);
  }, [toggleCheckBox]);
  useEffect(() => {
    setBorderShow(isBorderViewable);
  }, [isBorderViewable]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mostOuter}>
          <View style={styles.rowCenter}>
            <Text selectable style={styles.alFatiha}>
              {engAyahState ? engAyahState.englishName : null}
            </Text>
          </View>

          <View style={styles.rowCenter}>
            <Text selectable style={styles.openingAyah}>
              {engAyahState ? engAyahState.englishNameTranslation : null} (Ayah{' '}
              {engAyahState ? engAyahState.numberOfAyahs : null})
            </Text>
          </View>
          <Interstitial navigation={navigation} />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{height: isOptionView ? '70%' : '80%'}}>
            {engAyahState ? (
              engAyahState.ayahs.length > 0 ? (
                engAyahState.ayahs.map((item, key) => {
                  if (fullView) {

                    return (
                      <TouchableOpacity
                        style={[
                          styles.verseContainer,
                          {
                            borderBottomColor: isBorderShow
                              ? '#146199'
                              : 'white',
                          },
                        ]}
                        key={key}
                        onLongPress={() => {
                          setShareModal(item);
                          setVerse(item.number);
                          setVerseItem(item);
                          setSelectedArabicAyah(arabicAyahState.ayahs[key]);
                        }}
                        >
                        <View style={{alignItems: 'center'}}>
                          <ImageBackground
                            source={verse1}
                            style={{
                              height: height * 0.07,
                              width: width * 0.11,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text selectable style={{fontSize: 10}}>
                              {item.numberInSurah}
                            </Text>
                          </ImageBackground>
                          <CheckBox
                            isChecked={isItemChecked(item.number)}
                            onClick={(evt) => {
                              manageToggle(evt, item.number);
                            }}
                            style={{marginLeft: 10}}
                            checkBoxColor="#146199"
                          />
                        </View>
                        <View style={styles.verseOuterRight}>
                          <SelectableText
                            menuItems={['Search']}
                            onSelection={({content}) => {
                              console.log('content');
                              navigation.navigate('SearchTabsByContent', {
                                englishText: false,
                                arabicText: content,
                              });
                            }}
                            style={[
                              styles.arabicVerse,
                              {
                                fontSize: fontSizeAR,
                                fontFamily: fontFamilyName,
                                color: currentFontColor,
                              },
                            ]}
                            value={
                              arabicAyahState
                                ? arabicAyahState.ayahs[key].text.includes("سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ") ? arabicAyahState.ayahs[key].text.slice(38,arabicAyahState.ayahs[key].text.length) : arabicAyahState.ayahs[key].text
                                : null
                            }
                          />
                          <SelectableText
                            menuItems={['Search']}
                            onSelection={({content}) => {
                              navigation.navigate('SearchTabsByContent', {
                                englishText: content,
                                arabicText: false,
                              });
                            }}
                            style={[
                              styles.engVerse,
                              {fontSize: fontSizeEng, color: currentFontColor},
                            ]}
                            value={item.text}
                          />

                        </View>
                      </TouchableOpacity>
                    );
                  }
                  if (splitView) {
                    return (
                      <View key={key} style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            width: width * 0.5,
                            flexDirection: 'row',
                            borderRightWidth: 2,
                            borderRightColor: '#146199',
                            justifyContent: 'space-between',
                          }}>
                          <ImageBackground
                            source={verse1}
                            style={{
                              height: height * 0.06,
                              width: width * 0.09,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text selectable style={{fontSize: 11}}>
                              {item.number}
                            </Text>
                          </ImageBackground>
                          <TouchableOpacity>
                            <View style={{width: width * 0.35}}>
                              <Text
                                selectable
                                style={{
                                  fontSize: fontSizeEng,
                                  color: currentFontColor,
                                }}
                                selectable>
                                {item.text}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width: width * 0.5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontSize: fontSizeAR,
                                color: currentFontColor,
                                marginRight: 10,
                                fontFamily: fontFamilyName,
                              }}>
                              {arabicAyahState
                                ? arabicAyahState.ayahs[key].text
                                : null}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                  if (onlyArabic) {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.verseContainer,
                          {
                            borderBottomColor: isBorderShow
                              ? '#146199'
                              : 'white',
                          },
                        ]}
                        key={key}
                        onLongPress={() => {
                          setShareModal(arabicAyahState[key].text);
                          setVerse(item.number);
                          setVerseItem(item);
                          setSelectedArabicAyah(arabicAyahState.ayahs[key]);
                        }}>
                        <ImageBackground
                          source={verse1}
                          style={{
                            height: height * 0.1,
                            width: width * 0.14,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text selectable style={{fontSize: 12}}>
                            {item.number}
                          </Text>
                        </ImageBackground>
                        <View style={styles.verseOuterRight}>
                          <Text
                            selectable
                            style={[
                              styles.arabicVerse,
                              {
                                fontSize: fontSizeAR,
                                fontFamily: fontFamilyName,
                                color: currentFontColor,
                              },
                            ]}>
                            {arabicAyahState
                              ? arabicAyahState.ayahs[key].text
                              : null}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  if (onlyUduTranslation) {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.verseContainer,
                          {
                            borderBottomColor: isBorderShow
                              ? '#146199'
                              : 'white',
                          },
                        ]}
                        key={key}
                        onLongPress={() => {
                          setShareModal(item);
                          setVerse(item.number);
                          setVerseItem(item);
                          setSelectedArabicAyah(arabicAyahState.ayahs[key]);
                        }}>
                        <ImageBackground
                          source={verse1}
                          style={{
                            height: height * 0.1,
                            width: width * 0.14,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text selectable style={{fontSize: 12}}>
                            {item.number}
                          </Text>
                        </ImageBackground>
                        <View style={styles.verseOuterRight}>
                          <Text
                            selectable
                            style={[
                              styles.arabicVerse,
                              {
                                fontSize: fontSizeAR,
                                fontFamily: fontFamilyName,
                                color: currentFontColor,
                              },
                            ]}>
                            {arabicAyahState
                              ? arabicAyahState.ayahs[key].text
                              : null}
                          </Text>
                          <Text
                            selectable
                            style={[
                              styles.engVerse,
                              {fontSize: fontSizeEng, color: currentFontColor},
                            ]}>
                            {item.text}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  if (onlyTranslation) {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.verseContainer,
                          {
                            borderBottomColor: isBorderShow
                              ? '#146199'
                              : 'white',
                          },
                        ]}
                        key={key}
                        onLongPress={() => {
                          setShareModal(item);
                          setVerse(item.number);
                          setVerseItem(item);
                          setSelectedArabicAyah(arabicAyahState.ayahs[key]);
                        }}>
                        <ImageBackground
                          source={verse1}
                          style={{
                            height: height * 0.1,
                            width: width * 0.14,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text selectable style={{fontSize: 12}}>
                            {item.number}
                          </Text>
                        </ImageBackground>
                        <View style={styles.verseOuterRight}>
                          <Text
                            selectable
                            style={[
                              styles.engVerse,
                              {fontSize: fontSizeEng, color: currentFontColor},
                            ]}>
                            {item.text}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                  if (onlyTranslation) {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.verseContainer,
                          {
                            borderBottomColor: isBorderShow
                              ? '#146199'
                              : 'white',
                          },
                        ]}
                        key={key}
                        onLongPress={() => {
                          setShareModal(item);
                          setVerse(item.number);
                          setVerseItem(item);
                          setSelectedArabicAyah(arabicAyahState.ayahs[key]);
                        }}>
                        <Image source={verse1} style={styles.verseNumberImg} />
                        <View style={styles.verseOuterRight}>
                          <Text
                            selectable
                            style={[
                              styles.engVerse,
                              {fontSize: fontSizeEng, color: currentFontColor},
                            ]}>
                            {item.text}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <ActivityIndicator
                  color="#146199"
                  size="large"
                  style={{marginTop: height * 0.2}}
                />
              )
            ) : (
              <ActivityIndicator
                color="#146199"
                size="large"
                style={{marginTop: height * 0.2}}
              />
            )}
          </ScrollView>
          {/* <View style={styles.iconChevron}>
            <TouchableOpacity>
              <Icons name="chevron-up" size={40} color="#146199" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icons name="chevron-down" size={40} color="#146199" />
            </TouchableOpacity>
          </View> */}

          {isOptionView ? (
            <Options
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              setLayoutBox={setLayoutBox}
              layoutBox={layoutBox}
            />
          ) : null}
        </View>
        {modalVisible ? <ModalFont /> : null}
        {surahModel ? <ModalSurahName /> : null}
        {layoutBox ? <ModalLayout /> : null}
        {/* {voiceModal ? <ModalVoice /> : null} */}
        {shareModal ? (
          <ShareModel
            shareModal={shareModal}
            setShareModal={setShareModal}
            verseNo={verseNo}
            verseItem={verseItem}
            engAyahState={engAyahState}
            selectedArabicAyahState={selectedArabicAyahState}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mostOuter: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  iconChevron: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.005,
    borderBottomColor: '#146199',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  arabicVerse: {
    paddingRight: 15,
    // color: '#146199',
    marginBottom: 10,
    fontFamily: 'Al_Qalam_Quran_2',
    // wordSpacing: 12
  },
  engVerse: {
    width: width * 0.72,
    marginLeft: width * 0.05,
  },
  alFatiha: {fontSize: height * 0.03, marginTop: height * 0.005},
  openingAyah: {fontSize: height * 0.02, marginTop: height * 0.001},
  rowCenter: {flexDirection: 'row', justifyContent: 'center'},
  verseNumberImg: {marginLeft: 10},
  verseOuterRight: {width: width * 0.8},
});

let mapStateToProps = (state) => ({
  engAyah: state.SurahReducer.surah_ayah_eng,
  arabicAyah: state.SurahReducer.surah_ayah_arabic,
  fontFamilyName: state.SurahReducer.fontFamily,
  translationEng: state.SurahReducer.translationEng,
  translationUr: state.SurahReducer.translationUr,
  fontSizeEng: state.SurahReducer.fontSizeEng,
  fontSizeAR: state.SurahReducer.fontSizeAR,
  appLanguage: state.SurahReducer.appLanguage,
  fullView: state.ViewMode.fullView,
  onlyArabic: state.ViewMode.onlyArabic,
  arabicinTwoLines: state.ViewMode.arabicinTwoLines,
  onlyTranslation: state.ViewMode.onlyTranslation,
  splitView: state.ViewMode.splitView,
  onlyUduTranslation: state.ViewMode.onlyUduTranslation,
  ayahsTobeCompare: state.SurahReducer.ayahsTobeCompare,
  currentFontColor: state.ViewMode.currentFontColor,
  showAllOptions: state.ViewMode.showAllOptions,
});

export default connect(mapStateToProps, {
  getSurahAyahInArabi,
  getSurahAyahInEng,
})(HomePage);
