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
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import IconCommunity from 'react-native-vector-icons/Foundation';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import verse1 from '../assets/QuranRead/1.png';
import Axios from 'axios';
import {connect, useDispatch, useSelector} from 'react-redux';
import ShareComp from './ShareComponent';
import CheckBox from 'react-native-check-box';
import {
  versesForCompare,
  saveBookMarks,
  getAllSurah,
} from '../../redux/actions/surahAction';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({
  navigation,
  translationEng,
  appLanguage,
  translationUr,
  fontFamilyName,
}) => {
  const [radioValue, setRadioValue] = useState('Ayat');
  const [value, setValue] = useState();
  const [reslut, setResult] = useState();
  const [surah, setSurah] = useState();
  const [engWordResultArr, setEngWord] = useState();
  const [arbWordResultArr, setArabicWord] = useState();
  const [selectedDetails, setSelectedDetails] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [selectedUrduAyah, setSelectedUrduAyah] = useState(false);
  const [allSurah, setSurahList] = useState([]);
  const [surahNoToSearch, setSurahNoToSearch] = useState(1);
  const [verseNoToSearch, setVerseNoToSearch] = useState(1);
  const [verseNo, setVerseNo] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [toggleCheckBox, setToggleCheckBox] = useState([]);
  let dispatch = useDispatch();

  const onPress = (e) => {
    setValue('');
    setResult(false);
    setSurah(false);
    setEngWord(false);
    setArabicWord(false);
    setRadioValue(e);
  };
  let lang = appLanguage == 'en' ? translationEng : translationUr;
  const searchHandler = () => {
    setResult();
    setSurah();
    setEngWord();
    setArabicWord();
    switch (radioValue) {
      case 'Ayat':
        Axios.get(`https://api.alquran.cloud/v1/ayah/${value}/${lang}`).then(
          (urduTranslation) => {
            if (urduTranslation.data.code === 200) {
              let ayahsInUrdu = urduTranslation.data.data.text;

              Axios.get(`https://api.alquran.cloud/v1/ayah/${value}`).then(
                (response) => {
                  if (response.data.code === 200) {
                    // console.log(response.data.data.text);
                    // console.log(ayahsInUrdu);
                    let result = {
                      arabic: response.data.data.text,
                      ayahNumber: response.data.data.number,
                      urdu: urduTranslation.data.data.text,
                    };
                    setResult(result);
                  }
                },
              );
            }
          },
        );
        break;
      case 'Surah':
        Axios.get(`https://api.alquran.cloud/v1/surah/${value}/${lang}`).then(
          (urduTranslation) => {
            if (urduTranslation.data.code === 200) {
              let ayahsInUrdu = urduTranslation.data.data.ayahs;

              Axios.get(`https://api.alquran.cloud/v1/surah/${value}`).then(
                (response) => {
                  if (response.data.code === 200) {
                    // console.log(response.data.data.ayahs);
                    // console.log(ayahsInUrdu);
                    let result = {
                      arabic: response.data.data.ayahs,
                      surahNumber: response.data.data.number,
                      urdu: urduTranslation.data.data.ayahs,
                      englishName: response.data.data.englishName,
                      englishNameTranslation:
                        response.data.data.englishNameTranslation,
                      numberOfAyahs: response.data.data.numberOfAyahs,
                    };
                    setSurah(result);
                  }
                },
              );
            }
          },
        );
        break;
      case 'English Word':
        Axios.get(
          `https://api.alquran.cloud/v1/search/${value}/all/en.asad`,
        ).then((response) => {
          if (response.data.code === 200) {
            // console.log(response.data.data.matches);
            let result = {
              engWordResult: response.data.data.matches,
              totalResult: response.data.data.count,
            };
            setEngWord(result);
          }
        });
        break;
      case 'Arabic Word':
        Axios.get(
          `https://api.alquran.cloud/v1/search/${value}/all/quran-uthmani`,
        ).then((response) => {
          if (response.data.code === 200) {
            // console.log(response.data.data.matches);
            let result = {
              arbWordResult: response.data.data.matches,
              totalResult: response.data.data.count,
            };
            setArabicWord(result);
          }
        });
        break;

      default:
        break;
    }
  };

  const searchAyah = () => {
    Axios.get(
      `https://api.alquran.cloud/v1/ayah/${surahNoToSearch}:${verseNoToSearch}/${lang}`,
    ).then((urduTranslation) => {
      if (urduTranslation.data.code === 200) {
        let ayahsInUrdu = urduTranslation.data.data.text;

        Axios.get(
          `https://api.alquran.cloud/v1/ayah/${surahNoToSearch}:${verseNoToSearch}`,
        ).then((response) => {
          if (response.data.code === 200) {
            console.log(response.data.data.numberInSurah);
            let result = {
              arabic: response.data.data.text,
              ayahNumber: response.data.data.numberInSurah,
              urdu: urduTranslation.data.data.text,
              surahName: response.data.data.surah.englishName,
              surahNumber: response.data.data.surah.number,
              surahArabicName: response.data.data.surah.name,
            };
            setResult(result);
          }
        });
      }
    });
  };

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
  let surahList = useSelector((state) => state.SurahReducer.all_surah);
  useEffect(() => {
    dispatch(getAllSurah());
  }, []);
  useEffect(() => {
    setSurahList(surahList);
  }, [surahList]);

  const surahSelected = (name, ind) => {
    let selectedSurah = allSurah[ind];
    let arry = [];
    for (let i = 1; i <= selectedSurah.numberOfAyahs; i++) {
      arry.push(i);
    }
    setVerseNo(arry);
    setSurahNoToSearch(selectedSurah.number);
  };

  useEffect(() => {
    searchAyah();
  }, [surahNoToSearch, verseNoToSearch]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mostOuter}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              selectable
              style={{fontSize: height * 0.04, marginTop: height * 0.005}}>
              <Icon name="search" size={25} /> Search Quran
            </Text>
            <Text selectable style={{fontSize: 16, marginTop: height * 0.005}}>
              Change Surah Name &amp; verse no
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              height: '24%',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '10%',
              borderColor: '#146199',
              borderWidth: 2,
            }}>
            <View
              style={{
                flexDirection: 'column',
                height: '100%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  borderColor: '#146199',
                  borderWidth: 1,
                  backgroundColor: '#146199',
                  color: 'white',
                  width: '100%',
                  textAlign: 'center',
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderLeftWidth: 0,
                }}>
                Ayah
              </Text>
              <ScrollPicker
                dataSource={verseNo}
                selectedIndex={0}
                renderItem={(data, index) => {}}
                onValueChange={(data, selectedIndex) => {
                  setVerseNoToSearch(data);
                }}
                wrapperHeight={100}
                wrapperWidth={width * 0.3}
                wrapperBackground={'#FFFFFF'}
                itemHeight={30}
                highlightColor={'#146199'}
                highlightBorderWidth={2}
                highlightWidth={width * 0.3}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '70%',
                flexDirection: 'column',
                alignItems: 'center',
                borderLeftColor: '#146199',
                borderLeftWidth: 2,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  borderColor: '#146199',
                  backgroundColor: '#146199',
                  color: 'white',
                  borderWidth: 1,
                  width: '100%',
                  textAlign: 'center',
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderLeftWidth: 0,
                }}>
                Surah Name
              </Text>
              <ScrollPicker
                dataSource={
                  allSurah.length > 0
                    ? allSurah.map((item) => {
                        return item.englishName;
                      })
                    : []
                }
                selectedIndex={0}
                renderItem={(data, index) => {}}
                onValueChange={(data, selectedIndex) => {
                  surahSelected(data, selectedIndex);
                }}
                wrapperHeight={100}
                wrapperWidth={'100%'}
                wrapperBackground={'#FFFFFF'}
                itemHeight={30}
                highlightBorderWidth={2}
                highlightColor={'#146199'}
              />
            </View>
          </View>
          <Interstitial navigation={navigation} />
      

          <ScrollView style={{height: height * 0.26}}>
            {reslut ? (
              <View style={styles.verseContainer}>
                <View>
                  <ImageBackground
                    source={verse1}
                    style={{
                      height: height * 0.06,
                      width: width * 0.09,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <Text selectable style={{fontSize: 11}}>
                      {reslut.ayahNumber}
                    </Text>
                  </ImageBackground>

                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      marginTop: 5,
                      borderRadius: 50,
                    }}
                    onPress={() => {
                      setSelectedDetails(reslut);
                    }}>
                    <Icons
                      name="info-with-circle"
                      size={25}
                      style={{}}
                      color="#146199"
                    />
                  </TouchableOpacity>
                  <CheckBox
                    isChecked={isItemChecked(reslut.ayahNumber)}
                    onClick={(evt) => {
                      manageToggle(evt, reslut.ayahNumber);
                    }}
                    style={{marginTop: 10, marginLeft: 5}}
                    checkBoxColor="#146199"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      let obj = {
                        number: reslut.ayahNumber,
                        text: reslut.urdu,
                        surahArabicName: reslut.surahArabicName,
                        surahName: reslut.surahName,
                        arabicTxt: reslut.arabic,
                        surahNumber: reslut.surahNumber,
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
                <TouchableOpacity
                  style={styles.verseOuterRight}
                  onLongPress={() => {
                    let obj = {
                      number: reslut.ayahNumber,
                      text: reslut.urdu,
                      surahArabicName: reslut.surahArabicName,
                      surahName: reslut.surahName,
                      arabicTxt: reslut.arabic,
                      surahNumber: reslut.surahNumber,
                    };
                    setShareModal(obj);
                  }}>
                  <Text
                    style={[
                      styles.arabicVerse,
                      {
                        fontFamily: fontFamilyName,
                      },
                    ]}
                    selectable>
                    {reslut.arabic.includes(
                      'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                    )
                      ? reslut.arabic.slice(38, reslut.arabic.length)
                      : reslut.arabic}
                  </Text>
                  <Text selectable style={styles.engVerse}>
                    {reslut.urdu}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text selectable style={{padding: 10}}>
                No Data
              </Text>
            )}
          </ScrollView>
          <Banner />
        </View>
        
      </SafeAreaView>
      {selectedDetails ? (
        <View
          style={{
            height: '30%',
            position: 'absolute',
            zIndex: 15,
            backgroundColor: 'white',
            width: '70%',
            top: '35%',
            left: '15%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 3,
            borderColor: '#146199',
          }}>
          <View style={{width: '100%', marginLeft: '85%', marginTop: -15}}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                marginTop: 5,
                borderRadius: 50,
              }}
              onPress={() => {
                setSelectedDetails(false);
              }}>
              <Icons name="cross" size={25} style={{}} color="#146199" />
            </TouchableOpacity>
          </View>
          {selectedDetails.surah ? (
            <Text style={{fontSize: 18}}>
              Surah No: {selectedDetails.surah.number}
            </Text>
          ) : null}
          {selectedDetails.surah ? (
            <Text style={{fontSize: 18}}>
              Surah Name: {selectedDetails.surah.englishName}
            </Text>
          ) : null}
          {selectedDetails.number ? (
            <Text style={{fontSize: 18}}>
              Verse No: {selectedDetails.number}
            </Text>
          ) : selectedDetails.ayahNumber ? (
            <Text style={{fontSize: 18}}>
              Verse No: {selectedDetails.ayahNumber}
            </Text>
          ) : null}
          {selectedDetails.surah ? (
            <Text style={{fontSize: 18}}>
              Number In Surah: {selectedDetails.surah.numberInSurah}
            </Text>
          ) : null}
          {selectedDetails.numberInSurah ? (
            <Text style={{fontSize: 18}}>
              Number In Surah: {selectedDetails.numberInSurah}
            </Text>
          ) : null}
          {selectedDetails.page ? (
            <Text style={{fontSize: 18}}>Page: {selectedDetails.page}</Text>
          ) : null}
          {selectedDetails.juz ? (
            <Text style={{fontSize: 18}}>Juz: {selectedDetails.juz}</Text>
          ) : null}
        </View>
      ) : null}
      {shareModal ? (
        <ShareComp
          shareModal={shareModal}
          verseItem={shareModal}
          setShareModal={setShareModal}
          selectedUrduAyah={selectedUrduAyah}
          engSearch={engWordResultArr ? true : false}
          ayahSearch={reslut ? true : false}
          surahSearch={surah ? true : false}
          arabicSearch={arbWordResultArr ? true : false}
        />
      ) : null}
    </>
  );
};

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
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  radioOtr: {
    flexDirection: 'row',
    // marginHorizontal: width * 0.02,
    marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.005,
    borderBottomColor: '#146199',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  verseNumberImg: {marginLeft: 10},
  verseOuterRight: {width: width * 0.8},
  arabicVerse: {
    paddingRight: 15,
    fontSize: 24,
    color: '#146199',
    marginBottom: 10,
    fontFamily: 'Al_Qalam_Quran_2',
    textAlign: 'right',
  },
  engVerse: {
    paddingRight: 20,
  },
  iconBtn: {
    backgroundColor: '#146199',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 15,
  },
});
let mapStateToProps = (state) => ({
  translationEng: state.SurahReducer.translationEng,
  translationUr: state.SurahReducer.translationUr,
  appLanguage: state.SurahReducer.appLanguage,
  fontFamilyName: state.SurahReducer.fontFamily,
});

export default connect(mapStateToProps, null)(HomePage);
