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
  ActivityIndicator,
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
import {connect, useDispatch} from 'react-redux';
import ShareComp from './ShareComponent';
import CheckBox from 'react-native-check-box';
import {versesForCompare, saveBookMarks} from '../../redux/actions/surahAction';
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
  route,
}) => {
  const [radioValue, setRadioValue] = useState('Ayat');
  const [value, setValue] = useState();
  const [reslut, setResult] = useState();
  const [surah, setSurah] = useState();
  const [engWordResultArr, setEngWord] = useState();
  const [arbWordResultArr, setArabicWord] = useState();
  const [selectedDetails, setSelectedDetails] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [urduWord, setUrduWord] = useState(false);
  const [selectedUrduAyah, setSelectedUrduAyah] = useState(false);
  const [verseItem, setVerseItem] = useState(false);
  const [verseNo, setVerse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState([]);
  let {englishText, arabicText} = route.params;
  let dispatch = useDispatch();

  var radio_props = [
    {label: `Ayat`, value: 'Ayat'},
    {label: 'Surah', value: 'Surah'},
    {label: 'Arabic Word', value: 'Arabic Word'},
    {label: 'Urdu Word', value: 'Urdu Word'},
    {label: 'English Word', value: 'English Word'},
  ];
  const onPress = (e) => {
    setValue('');
    setIsLoading(false);
    setResult(false);
    setSurah(false);
    setEngWord(false);
    setUrduWord(false);
    setArabicWord(false);
    setRadioValue(e);
  };
  let lang = appLanguage == 'en' ? translationEng : translationUr;
  const searchHandler = () => {
    setIsLoading(true);

    switch (radioValue) {
      case 'Ayat':
        Axios.get(`https://api.alquran.cloud/v1/ayah/${value}/${lang}`).then(
          (urduTranslation) => {
            if (urduTranslation.data.code === 200) {
              let ayahsInUrdu = urduTranslation.data.data.text;

              Axios.get(`https://api.alquran.cloud/v1/ayah/${value}`).then(
                (response) => {
                  if (response.data.code === 200) {
                    // console.log(ayahsInUrdu);
                    let result = {
                      arabic: response.data.data.text,
                      ayahNumber: response.data.data.numberInSurah,
                      urdu: urduTranslation.data.data.text,
                      surahNumber: response.data.data.surah.number,
                      surahName: response.data.data.surah.englishName,
                      surahArabicName: response.data.data.surah.name,
                    };
                    setResult(result);
                    setIsLoading(false);
                  }
                },
              );
            }
          },
        )
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
                      surahArabicName:response.data.data.name
                    };
                    setSurah(result);
                    setIsLoading(false);
                  }
                },
              );
            }
          },
        )
        break;
      case 'English Word':
        Axios.get(
          `https://api.alquran.cloud/v1/search/${value}/all/en.asad`,
        ).then((response) => {
          if (response.data.code === 200) {
            console.log(response.data.data.matches[1]);
            let result = {
              engWordResult: response.data.data.matches,
              totalResult: response.data.data.count,
            };
            setEngWord(result);
            setIsLoading(false);
          }
        })
        break;
      case 'Arabic Word':
        // console.log(value);
        Axios.get(
          `https://api.alquran.cloud/v1/search/${value}/all/quran-uthmani`,
        ).then((response) => {
          if (response.data.code === 200) {
            console.log(response.data.data.matches);
            let result = {
              arbWordResult: response.data.data.matches,
              totalResult: response.data.data.count,
            };
            setArabicWord(result);
            setIsLoading(false);
          }
        })
        break;
      case 'Urdu Word':
        Axios.get(
          `https://api.alquran.cloud/v1/search/${value}/all/ur.ahmedali`,
        ).then((response) => {
          if (response.data.code === 200) {
            // console.log(response.data.data.matches);
            let result = {
              urduWordResult: response.data.data.matches,
              totalResult: response.data.data.count,
            };
            setUrduWord(result);
            setIsLoading(false);
          }
        })
        break;

      default:
        break;
    }
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
  useEffect(() => {
    setTimeout(() => {
      searchHandler();
    }, 2000);
  }, [radioValue]);

  useEffect(() => {
    var regex = new RegExp(/^[a-zA-Z ]*$/);
    if (englishText) {
      if (regex.test(englishText)) {
        setRadioValue('English Word');
        setValue(englishText);
      } else {
        setRadioValue('Urdu Word');
        setValue(englishText);
      }
    }
    if (arabicText) {
      setRadioValue('Arabic Word');
      setValue(arabicText);
    }
    
  }, []);

  
  const bookMarkEnglishWord = async (obj,val) => {
    let result = await Axios.get(
      `https://api.alquran.cloud/v1/ayah/${obj.number}`,
    );

    let objNew = {
      ...obj,
      arabicTxt: result.data.data.text,
    };
    if(val){
      setShareModal(objNew)
    }else{
      dispatch(saveBookMarks(objNew));
      setTimeout(() => {
        Alert.alert('Ayah has been bookmarked.');
      });
    }
  };
  const bookMarkUrduWord = async (obj,val) => {
    let result = await Axios.get(
      `https://api.alquran.cloud/v1/ayah/${obj.number}/en.asad`,
    );

    let objNew = {
      ...obj,
      text: result.data.data.text,
    };
    console.log(objNew);
    if(val){
      setShareModal(objNew)
    }else{
      dispatch(saveBookMarks(objNew));
      setTimeout(() => {
        Alert.alert('Ayah has been bookmarked.');
      });
    }
  };

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
              <Icon name="search" size={20} /> Search Quran
            </Text>
            <Text
              selectable
              style={{fontSize: height * 0.03, marginTop: height * 0.002}}>
              Select you Search Option
            </Text>
          </View>
          <View style={[styles.radioOtr]}>
            {radio_props.map((obj, i) => (
               <View key={i} style={styles.singleBtnOuter}>
               <RadioButton>
                 <RadioButtonInput
                   obj={obj}
                   index={i}
                   isSelected={1 === i}
                   onPress={onPress}
                   borderWidth={0}
                   buttonInnerColor={'#ffffff'}
                   buttonOuterColor={'#ffffff'}
                   buttonSize={0}
                   buttonOuterSize={0}
                   buttonStyle={{display: 'none'}}
                   buttonWrapStyle={{marginLeft: 5}}
                 />
                 <RadioButtonLabel
                   obj={obj}
                   index={i}
                   onPress={onPress}
                   labelStyle={{
                     fontSize: 9,
                     color: radioValue == obj.label ? '#ffffff' : 'black',
                     backgroundColor:
                       radioValue == obj.label ? '#146199' : '#ffffff',
                     padding: 5,
                     width: width * 0.18,
                     fontWeight: '700',
                     textAlign: 'center',
                     borderWidth: 1,
                   }}
                   labelWrapStyle={{paddingLeft: 0}}
                 />
               </RadioButton>
             </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: width * 0.05,
            }}>
            <TextInput
              style={{borderWidth: 1, flex: 1}}
              onChangeText={(text) => setValue(text)}
              value={value}
            />
            <TouchableOpacity
              style={{backgroundColor: '#146199'}}
              onPress={searchHandler}>
              <Icon
                name="search"
                size={25}
                style={{padding: 13}}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Interstitial navigation={navigation} />
      <Banner />
          <ScrollView style={{height: height * 0.26}}>
            {!isLoading ? (
              reslut ? (
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
                        let obj = {
                          number: reslut.ayahNumber,
                          text: reslut.urdu,
                          arabicTxt: reslut.arabic,
                          surahNumber: reslut.surahNumber,
                          surahName: reslut.surahName,
                        };
                        setSelectedDetails(obj);
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
                          arabicTxt: reslut.arabic,
                          surahNumber: reslut.surahNumber,
                          surahName: reslut.surahName,
                          surahArabicName: reslut.surahArabicName
                        };
                        // console.log(obj);
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
                        arabicTxt: reslut.arabic,
                        surahNumber: reslut.surahNumber,
                        surahName: reslut.surahName,
                        surahArabicName: reslut.surahArabicName
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
              ) : surah ? (
                surah.arabic.map((item, key) => {
                  return (
                    <View style={styles.verseContainer} key={key}>
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
                            {item.numberInSurah}
                          </Text>
                        </ImageBackground>
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            marginTop: 5,
                            borderRadius: 50,
                          }}
                          onPress={() => {
                            setSelectedDetails(item);
                          }}>
                          <Icons
                            name="info-with-circle"
                            size={25}
                            style={{}}
                            color="#146199"
                          />
                        </TouchableOpacity>
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
                            let obj = {
                              number: item.numberInSurah,
                              arabicTxt: item.text,
                              surahName: surah.englishName,
                              surahNumber: surah.surahNumber,
                              text: surah.urdu[key].text,
                              surahArabicName:surah.surahArabicName
                            };
                          //  console.log(obj)
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
                            number: item.numberInSurah,
                            arabicTxt: item.text,
                            surahName: surah.englishName,
                            surahNumber: surah.surahNumber,
                            text: surah.urdu[key].text,
                            surahArabicName:surah.surahArabicName
                          };
                          setShareModal(obj);
                          // setSelectedUrduAyah(surah.urdu[key].text);
                        }}>
                        <Text
                          style={[
                            styles.arabicVerse,
                            {
                              fontFamily: fontFamilyName,
                            },
                          ]}
                          selectable>
                      
                          {item.text.includes(
                            'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                          )
                            ? item.text.slice(38, item.text.length)
                            : item.text}
                        </Text>
                        <Text selectable style={styles.engVerse}>
                          {surah.urdu[key].text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : engWordResultArr ? (
                engWordResultArr.engWordResult.map((item, key) => {
                  return (
                    <View style={styles.verseContainer} key={key}>
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
                            {item.numberInSurah}
                          </Text>
                        </ImageBackground>
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            marginTop: 5,
                            borderRadius: 50,
                          }}
                          onPress={() => {
                            setSelectedDetails(item);
                          }}>
                          <Icons
                            name="info-with-circle"
                            size={25}
                            style={{}}
                            color="#146199"
                          />
                        </TouchableOpacity>
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
                            let obj = {
                              number: item.numberInSurah,
                              text: item.text,
                              surahNumber: item.surah.number,
                              surahName: item.surah.englishName,
                              surahArabicName:item.surah.name
                            };
                            // console.log(obj);
                            bookMarkEnglishWord(obj);
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
                            number: item.numberInSurah,
                            text: item.text,
                            surahNumber: item.surah.number,
                            surahName: item.surah.englishName,
                            surahArabicName:item.surah.name
                          };
                          bookMarkEnglishWord(obj,true);
                        }}>
                        <Text
                          style={[
                            styles.arabicVerse,
                            {
                              fontSize: 14,
                              textAlign: 'left',
                              fontWeight: '700',
                              fontFamily: fontFamilyName,
                            },
                          ]}
                          selectable>
                          {item.text}
                        </Text>
                        <Text
                          selectable
                          style={[
                            styles.arabicVerse,
                            {
                              fontFamily: fontFamilyName,
                              fontSize: 14,
                              textAlign:'left',
                            },
                          ]}
                          selectable>
                          Surah Name: {item.surah.englishName} V#
                          {item.numberInSurah}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : arbWordResultArr ? (
                arbWordResultArr.arbWordResult.map((item, key) => {
                  return (
                    <View style={styles.verseContainer} key={key}>
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
                            {item.numberInSurah}
                          </Text>
                        </ImageBackground>
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            marginTop: 5,
                            borderRadius: 50,
                          }}
                          onPress={() => {
                            setSelectedDetails(item);
                          }}>
                          <Icons
                            name="info-with-circle"
                            size={25}
                            style={{}}
                            color="#146199"
                          />
                        </TouchableOpacity>
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
                            let obj = {
                              number: item.numberInSurah,
                              arabicTxt: item.text,
                              surahNumber: item.surah.number,
                              surahName: item.surah.englishName,
                              surahArabicName:item.surah.name
                            };
                            bookMarkUrduWord(obj)
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
                            number: item.numberInSurah,
                            arabicTxt: item.text,
                            surahNumber: item.surah.number,
                            surahName: item.surah.englishName,
                            surahArabicName:item.surah.name
                          };
                          bookMarkUrduWord(obj,true)
                        }}>
                        <Text
                          selectable
                          style={[
                            styles.arabicVerse,
                            {
                              fontFamily: fontFamilyName,
                            },
                          ]}
                          selectable>
                          {item.text}
                        </Text>
                        <Text
                          selectable
                          style={[
                            styles.arabicVerse,
                            {
                              fontFamily: fontFamilyName,
                              fontSize: 14,
                              
                            },
                          ]}
                          selectable>
                          Surah Name: {item.surah.englishName} V#
                          {item.numberInSurah}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) :urduWord ? (
                urduWord.urduWordResult.map((item, key) => {
                  return (
                    <View style={styles.verseContainer} key={key}>
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
                            {item.numberInSurah}
                          </Text>
                        </ImageBackground>
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            marginTop: 5,
                            borderRadius: 50,
                          }}
                          onPress={() => {
                            setSelectedDetails(item);
                          }}>
                          <Icons
                            name="info-with-circle"
                            size={25}
                            style={{}}
                            color="#146199"
                          />
                        </TouchableOpacity>
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
                            let obj = {
                              number: item.numberInSurah,
                              arabicTxt: item.text,
                              surahNumber: item.surah.number,
                              surahName: item.surah.englishName,
                              surahArabicName:item.surah.name
                            };
                            bookMarkUrduWord(obj)
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
                            number: item.numberInSurah,
                            arabicTxt: item.text,
                            surahNumber: item.surah.number,
                            surahName: item.surah.englishName,
                            surahArabicName:item.surah.name
                          };
                          bookMarkUrduWord(obj,true)
                        }}>
                        <Text
                          selectable
                          style={[
                            styles.arabicVerse,
                            {
                              fontFamily: fontFamilyName,
                            },
                          ]}
                          selectable>
                          {item.text}
                        </Text>
                        <Text
                          selectable
                          style={[
                            styles.arabicVerse,
                            {
                              fontFamily: fontFamilyName,
                              fontSize: 14,
                            },
                          ]}
                          selectable>
                          Surah Name: {item.surah.englishName} V#
                          {item.numberInSurah}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <Text selectable style={{padding: 10}}>
                  No Data
                </Text>
              )
            ) : (
              <ActivityIndicator
                color="#146199"
                size="large"
                style={{marginTop: height * 0.2}}
              />
            )}
          </ScrollView>
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
          {selectedDetails.surahNumber ? (
            <Text style={{fontSize: 18}}>
              Surah No: {selectedDetails.surahNumber}
            </Text>
          ) : null}
          {selectedDetails.surahName ? (
            <Text style={{fontSize: 18}}>
              Surah Name: {selectedDetails.surahName}
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
              Ayat Number In Surah: {selectedDetails.surah.numberInSurah}
            </Text>
          ) : null}
          {selectedDetails.numberInSurah ? (
            <Text style={{fontSize: 18}}>
              Ayat Number In Surah: {selectedDetails.numberInSurah}
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
