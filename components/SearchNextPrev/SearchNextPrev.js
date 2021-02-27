import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import verse1 from '../assets/QuranRead/1.png';
import {saveBookMarks, versesForCompare} from '../../redux/actions/surahAction';
import IconCommunity from 'react-native-vector-icons/Foundation';
import {connect, useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import CheckBox from 'react-native-check-box';
import ShareModel from './ShareComponent';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({route, translationEng, appLanguage, translationUr}) => {
  const [engAyahState, setEngAyah] = useState(false);
  const [arabicAyahState, setArabicAyah] = useState(false);
  const [selectedValue2, setSelectedValue2] = useState(5);
  const [verseArr, setVerseArr] = useState([]);
  const [versesToShow, setVersesToShow] = useState(false);
  const [versesToShowPrev, setVersesToShowPrev] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const [verse_no, setVerse] = useState(false);
  const [verseItem, setVerseItem] = useState(false);
  const [selectedArabicAyahState, setSelectedArabicAyah] = useState(false);

  let dispatch = useDispatch();

  let {surahNumber, verseNo} = route.params;

  useEffect(() => {
    setVersesToShow([]);
    Axios.get('https://api.alquran.cloud/v1/surah/' + surahNumber).then(
      (result) => {
        setArabicAyah(result.data.data);
      },
    );
    let lang = appLanguage == 'en' ? translationEng : translationUr;
    Axios.get(
      'https://api.alquran.cloud/v1/surah/' + surahNumber + '/'+lang,
    ).then((result) => {
      // console.log(result.data.data.ayahs[5]);
      setEngAyah(result.data.data);
    });
  }, []);

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const searchPicker = () => {
    let arry = [];
    for (let i = 1; i <= selectedValue2; i++) {
      arry.push(i);
    }
    setVerseArr(arry);
  };
  useEffect(() => {
    searchPicker();
  }, [selectedValue2]);
  useEffect(() => {
    let versesToShowNext = [];
    let versesToShowPrev = [];
    if (engAyahState) {
      for (var i = verseNo; i <= verseNo + selectedValue2; i++) {
        for (var j = 0; j <= engAyahState.ayahs.length; j++) {
          if (i === j) {
            versesToShowNext.push(engAyahState.ayahs[j]);
          }
        }
      }
      setVersesToShow(versesToShowNext);
    }
    if (engAyahState) {
      for (var i = verseNo; i > verseNo - selectedValue2 - 1; i--) {
        for (var j = 0; j <= engAyahState.ayahs.length; j++) {
          if (i === j) {
            versesToShowPrev.push(engAyahState.ayahs[j]);
          }
        }
      }
      setVersesToShowPrev(versesToShowPrev.reverse());
    }
  }, [verseArr, engAyahState]);

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
  }, [toggleCheckBox]);

  return (
    <>
      <View style={styles.mostOuter}>
        <View style={styles.rowCenter}>
          <Text selectable style={styles.alFatiha}>
            Select Number from DropDown
          </Text>
        </View>
        <View style={styles.rowCenter}>
          <Text selectable style={styles.openingAyah}>
            Search Ayah From Surah{' '}
            {engAyahState ? engAyahState.englishName : null}
          </Text>
        </View>
        <View
          style={{
            height: 50,
            width: width * 0.5,
            borderWidth: 1,
            borderColor: 'black',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10,
          }}>
          <Picker
            selectedValue={selectedValue2}
            style={{
              height: 50,
              width: width * 0.5,
              borderWidth: 1,
              borderColor: 'black',
            }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue2(itemValue);
            }}>
            {data.map((item, key) => (
              <Picker.Item label={item.toString()} value={item} key={key} />
            ))}
          </Picker>
        </View>
        
<Interstitial navigation={navigation} />
      <Banner />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{height: '80%'}}>
          {versesToShowPrev
            ? versesToShowPrev.map((item, key) => {
                if (item) {
                  return (
                    <TouchableOpacity
                      style={styles.verseContainer}
                      key={key}
                      onLongPress={() => {
                        let arabicTxt = arabicAyahState.ayahs.filter(
                          (thing, key) => {
                            if (thing.number === item.number) {
                              return thing.text;
                            }
                          },
                        );
                        let obj = {
                          number: item.numberInSurah,
                          text: item.text,
                          surahName: engAyahState.englishName,
                          arabicTxt: arabicTxt[0].text,
                          surahNumber: arabicAyahState.number,
                          surahArabicName: engAyahState.name,
                        };
                        setShareModal(obj);
                        setVerse(item.number);
                        setVerseItem(item);
                        setSelectedArabicAyah(arabicAyahState.ayahs[key]);
                      }}>
                      <View>
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
                          style={{marginTop: 10, marginLeft: 5}}
                          checkBoxColor="#146199"
                        />
                        <TouchableOpacity
                          onPress={() => {
                            let arabicTxt = arabicAyahState.ayahs.filter(
                              (thing, key) => {
                                if (thing.number === item.number) {
                                  return thing.text;
                                }
                              },
                            );
                            let obj = {
                              number: item.numberInSurah,
                              text: item.text,
                              surahName: engAyahState.englishName,
                              arabicTxt: arabicTxt[0].text,
                              surahNumber: arabicAyahState.number,
                              surahArabicName: engAyahState.name,
                            };
                            dispatch(saveBookMarks(obj));
                            setTimeout(() => {
                              Alert.alert('Ayah has been bookmarked.');
                            });
                          }}>
                          <IconCommunity
                            name="bookmark"
                            size={30}
                            color="#146199"
                            style={{marginTop: 5, marginLeft: 10}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.verseOuterRight}>
                        <Text style={[styles.arabicVerse]} selectable>
                          {arabicAyahState
                            ? arabicAyahState.ayahs.map((thing, key) => {
                                if (thing.number === item.number) {
                                  return thing.text;
                                }
                              })
                            : null}
                        </Text>
                        <Text selectable style={[styles.engVerse]}>
                          {item.text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })
            : null}
          {versesToShow
            ? versesToShow.map((item, key) => {
                if (item) {
                  if (key !== 0) {
                    return (
                      <TouchableOpacity
                        style={styles.verseContainer}
                        key={key}
                        onLongPress={() => {
                          let arabicTxt = arabicAyahState.ayahs.filter(
                            (thing, key) => {
                              if (thing.number === item.number) {
                                return thing.text;
                              }
                            },
                          );
                          let obj = {
                            number: item.numberInSurah,
                            text: item.text,
                            surahName: engAyahState.englishName,
                            arabicTxt: arabicTxt[0].text,
                            surahNumber: arabicAyahState.number,
                            surahArabicName: engAyahState.name,
                          };
                          setShareModal(obj);
                          setVerse(item.number);
                          setVerseItem(item);
                          setSelectedArabicAyah(arabicAyahState.ayahs[key]);
                        }}>
                        <View>
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
                            style={{marginTop: 10, marginLeft: 5}}
                            checkBoxColor="#146199"
                          />
                          <TouchableOpacity
                            onPress={() => {
                              let arabicTxt = arabicAyahState.ayahs.filter(
                                (thing, key) => {
                                  if (thing.number === item.number) {
                                    return thing.text;
                                  }
                                },
                              );
                              let obj = {
                                number: item.numberInSurah,
                                text: item.text,
                                surahName: engAyahState.englishName,
                                arabicTxt: arabicTxt[0].text,
                                surahNumber: arabicAyahState.number,
                                surahArabicName: engAyahState.name,
                              };
                              dispatch(saveBookMarks(obj));
                              setTimeout(() => {
                                Alert.alert('Ayah has been bookmarked.');
                              });
                            }}>
                            <IconCommunity
                              name="bookmark"
                              size={30}
                              color="#146199"
                              style={{marginTop: 5, marginLeft: 10}}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.verseOuterRight}>
                          <Text style={[styles.arabicVerse]} selectable>
                            {arabicAyahState
                              ? arabicAyahState.ayahs.map((thing, key) => {
                                  if (thing.number === item.number) {
                                    return thing.text;
                                  }
                                })
                              : null}
                          </Text>
                          <Text selectable style={[styles.engVerse]}>
                            {item.text}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }
              })
            : null}
        </ScrollView>
      </View>

      {shareModal ? (
        <ShareModel
          shareModal={shareModal}
          setShareModal={setShareModal}
          verseItem={shareModal}
        />
      ) : null}
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
    fontSize: 20,
    fontFamily: 'Al_Qalam_Quran_2',
    // wordSpacing: 12
  },
  engVerse: {
    width: width * 0.72,
    marginLeft: width * 0.05,
    fontSize: 18,
  },
  alFatiha: {fontSize: height * 0.03, marginTop: height * 0.005},
  openingAyah: {fontSize: height * 0.02, marginTop: height * 0.001},
  rowCenter: {flexDirection: 'row', justifyContent: 'center'},
  verseNumberImg: {marginLeft: 10},
  verseOuterRight: {width: width * 0.8},
});

let mapStateToProps = (state) => ({
  translationEng: state.SurahReducer.translationEng,
  translationUr: state.SurahReducer.translationUr,
  appLanguage: state.SurahReducer.appLanguage,
});

export default connect(mapStateToProps, null)(HomePage);
