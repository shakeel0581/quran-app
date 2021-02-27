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
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonic from 'react-native-vector-icons/Ionicons';
import verse1 from '../assets/QuranRead/1.png';
import verse2 from '../assets/QuranRead/2.jpg';
import verse3 from '../assets/QuranRead/3.jpg';
import verse4 from '../assets/QuranRead/4.jpg';
import mosque from '../assets/AlFatiha_Layout/1.jpg';
import midImg from '../assets/AlFatiha_Layout/192x192.png';
import bismillahImg from '../assets/AlFatiha_Layout/3.jpg';
import bismillahBottomBorder from '../assets/AlFatiha_Layout/4.jpg';
import playImg from '../assets/AlFatiha_Layout/5.jpg';
import midIcon from '../assets/AlFatiha_Layout/6.png';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {getAllSurah, saveBookMarksSurah} from '../../redux/actions/surahAction';
import {connect, useDispatch, useSelector} from 'react-redux';
import loader from '../assets/loader.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from 'react-native-letter-spacing';
import HijriDate from 'hijri-date/lib/safe';
import {Picker} from '@react-native-picker/picker';
import Options from './Options';

import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

let monthNameArr = [
  'Muḥarram',
  'Ṣafar',
  'Rabī al-awwal',
  'Rabī ath-thānī',
  'Jumādá al-ūlá',
  'Jumādá al-ākhirah',
  'Rajab',
  'Shabān',
  'Ramaḍān',
  'Shawwāl',
  'Dhū al-Qadah',
  'Dhū al-Ḥijjah',
];
let dateHijri = new HijriDate();
let hijriDate =
  monthNameArr[dateHijri._month - 1] +
  ' ' +
  dateHijri._date +
  ', ' +
  dateHijri._year +
  'AH';
let gorDate = Date();

const HomePage = ({
  navigation,
  surahList,
  getAllSurah,
  fontFamilyName,
  fontSizeAR,
  fontSizeEng,
  currentFontColor,
  showAllOptions,
}) => {
  const [surah, setSurahs] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [isSplit, setIsSplit] = useState(false);
  const [isOptionView, setOptionsView] = useState(true);
  const [isBorderShow, setBorderShow] = useState(true);
  let isBorderViewable = useSelector(
    (state) => state.ViewMode.showBottomBorder,
  );

  let dispatch = useDispatch();
  useEffect(() => {
    getAllSurah();
    setOptionsView(showAllOptions);
  }, [showAllOptions]);
  useEffect(() => {
    // console.log(isBorderViewable);
    setSurahs(surahList);
    setBorderShow(isBorderViewable);
  }, [surahList, isBorderViewable]);

 
  

  return (
    <>
    <Interstitial navigation={navigation} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{height: '100%', backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {/* Header Start */}

            <>
              <View style={styles.headerWrp}>
                <View style={styles.mostLeft}>
                  <Image
                    source={mosque}
                    style={{
                      marginLeft: width * 0.05,
                      marginBottom: height * 0.02,
                    }}
                  />
                  <Text selectable style={styles.headerTxt}>
                    {hijriDate}
                  </Text>
                </View>
                <View style={styles.headerMid}>
                  <Image
                    source={midImg}
                    style={{height: height * 0.1, width: width * 0.18}}
                  />
                </View>
                <View style={styles.headerRight}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginBottom: height * 0.02,
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Settings')}>
                      <Icon
                        name="gear"
                        size={25}
                        color="black"
                        style={{marginRight: 10}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDropdown(!dropdown)}>
                      <IconFontisto name="more-v-a" size={30} color="black" />
                    </TouchableOpacity>
                  </View>
                  <Text selectable style={styles.headerTxt}>
                    {gorDate.slice(0, 16)}
                  </Text>
                </View>
              </View>
              {dropdown ? (
                <View
                  style={{
                    height: 100,
                    width: 80,
                    position: 'absolute',
                    zIndex: 99,
                    right: '5%',
                    top: 40,
                    elevation: 12,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    borderWidth: 1,
                    borderColor: 'black',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSplit(true);
                      setDropdown(false);
                    }}
                    style={{borderBottomColor: 'black', borderBottomWidth: 2}}>
                    <Text
                      selectable
                      style={{fontSize: 16, paddingVertical: 10}}>
                      Split view
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSplit(false);
                      setDropdown(false);
                    }}>
                    <Text
                      selectable
                      style={{fontSize: 16, paddingVertical: 10}}>
                      Full view
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
            {/* Header Ends */}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={{marginTop: height * 0.01}} source={bismillahImg} />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={{marginTop: height * 0.001}}
              source={bismillahBottomBorder}
            />
          </View>
          {/* If Split view is true then show Split view else show full View */}
          {isSplit ? (
            // Split View Start
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{height: isOptionView ? '70%' : '80%'}}>
              {surah ? (
                surah.length > 0 ? (
                  surah.map((item, key) => (
                    <TouchableOpacity
                      style={styles.verseContainer}
                      key={key}
                      onPress={() =>
                        navigation.navigate('AlFatiha', {
                          surahNumber: item.number,
                        })
                      }
                      >
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
                          <View style={{marginLeft: 5}}>
                            <Text
                              selectable
                              style={{fontSize: fontSizeEng}}
                              selectable>
                              {item.englishName}
                            </Text>
                            <Text
                              style={{
                                fontSize: fontSizeEng,
                                width: width * 0.28,
                              }}
                              selectable>
                              {item.englishNameTranslation} (Ayah{' '}
                              {item.numberOfAyahs})
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Quran_Verse', {
                              surahNumber: item.number,
                            })
                          }>
                          <Image
                            source={playImg}
                            style={{
                              marginLeft: width * 0.05,
                              height: height * 0.035,
                              width: width * 0.06,
                              marginRight: width * 0.01,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          width: width * 0.5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          {/* <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('AlFatiha', {
                                surahNumber: item.number,
                              })
                            }>
                            <Icons name="eye" size={20} color="#146199" />
                          </TouchableOpacity> */}
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(saveBookMarksSurah(item));
                              setTimeout(() => {
                                Alert.alert('Surah has been bookmarked.');
                              });
                            }}>
                            <Icons name="bookmark" size={20} color="#146199" />
                          </TouchableOpacity>
                          {/* <TouchableOpacity>
                            <Image
                              source={midIcon}
                              style={{
                                height: height * 0.03,
                                width: width * 0.045,
                              }}
                            />
                          </TouchableOpacity> */}
                          {/* <TouchableOpacity>
                            <IconEntypo
                              name="share"
                              size={20}
                              color="#146199"
                            />
                          </TouchableOpacity> */}
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: fontSizeAR,
                              color: currentFontColor,
                              marginRight: 10,
                              fontFamily: fontFamilyName,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <ActivityIndicator
                    size="large"
                    color="#146199"
                    style={{marginTop: height * 0.2}}
                  />
                )
              ) : (
                <ActivityIndicator
                  size="large"
                  color="#146199"
                  style={{marginTop: height * 0.2}}
                />
              )}
            </ScrollView>
          ) : (
            // Split View End
            // Full View Start
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{height: isOptionView ? '70%' : '80%'}}>
              {surah ? (
                surah.length > 0 ? (
                  surah.map((item, key) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.verseContainer1,
                          {
                            borderBottomColor: isBorderShow
                              ? '#146199'
                              : 'white',
                          },
                        ]}
                        key={key}
                        onPress={() =>
                          navigation.navigate('AlFatiha', {
                            surahNumber: item.number,
                          })
                        }>
                        <ImageBackground
                          source={verse1}
                          style={{
                            height: height * 0.06,
                            width: width * 0.09,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
                          }}
                          onPress={() =>
                            navigation.navigate('AlFatiha', {
                              surahNumber: item.number,
                            })
                          }>
                          <Text selectable style={{fontSize: 11}}>
                            {item.number}
                          </Text>
                        </ImageBackground>

                        <View
                          style={{
                            width: '70%',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text
                              selectable
                              style={{
                                fontSize: fontSizeEng,
                                fontWeight: '700',
                              }}>
                              {item.englishName}
                            </Text>
                            <Text
                              style={[
                                {
                                  fontSize: fontSizeAR,
                                  fontFamily: fontFamilyName,
                                  paddingRight: 15,
                                  fontSize: 24,
                                  color: '#146199',
                                },
                              ]}
                              selectable>
                              {item.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingRight: 25,
                            }}>
                            <Text
                              style={{
                                fontSize: fontSizeEng,
                                width: width * 0.28,
                              }}
                              selectable>
                              {item.englishNameTranslation} (Ayah{' '}
                              {item.numberOfAyahs})
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                         
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate('Quran_Verse', {
                                    surahNumber: item.number,
                                  })
                                }>
                                <Image
                                  source={playImg}
                                  style={{
                                    marginLeft: width * 0.01,
                                    height: height * 0.035,
                                    width: width * 0.06,
                                    marginRight: width * 0.01,
                                  }}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  dispatch(saveBookMarksSurah(item));
                                  setTimeout(() => {
                                    Alert.alert('Surah has been bookmarked.');
                                  });
                                }}>
                                <Icons
                                  name="bookmark"
                                  size={20}
                                  color="#146199"
                                />
                              </TouchableOpacity>

                              {/* <TouchableOpacity>
                                <IconEntypo
                                  name="share"
                                  size={20}
                                  color="#146199"
                                />
                              </TouchableOpacity> */}
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
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
            // Full View End
          )}
          {isOptionView ? <Options /> : null}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  mostOuter: {
    backgroundColor: '#ffffff',
  },
  headerWrp: {
    height: height * 0.13,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  headerTxt: {
    fontSize: 10,
  },

  topScrollView: {
    fontSize: height * 0.013,
    marginTop: height * 0.005,
    width: width * 0.15,
    height: width * 0.15,
    marginHorizontal: 5,
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  verseContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.005,
    borderBottomColor: '#146199',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  verseContainer: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    borderBottomColor: '#146199',
    borderBottomWidth: 2,
    height: height * 0.1,
  },
  arabicVerse: {
    paddingRight: 15,
    fontSize: 24,
    color: '#146199',
    marginBottom: 10,
  },
  engVerse: {
    width: width * 0.72,
    marginLeft: width * 0.05,
  },
});

let mapStateToProps = (state) => {
  return {
    surahList: state.SurahReducer.all_surah,
    fontFamilyName: state.SurahReducer.fontFamily,
    fontSizeEng: state.SurahReducer.fontSizeEng,
    fontSizeAR: state.SurahReducer.fontSizeAR,
    currentFontColor: state.ViewMode.currentFontColor,
    showAllOptions: state.ViewMode.showAllOptions,
  };
};

export default connect(mapStateToProps, {getAllSurah})(HomePage);
