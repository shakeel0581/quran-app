/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';

import {connect, useDispatch, useSelector} from 'react-redux';
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
  Linking,
  Platform,
} from 'react-native';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";


import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonic from 'react-native-vector-icons/Ionicons';
import verse1 from '../assets/QuranRead/1.png';
import mosque from '../assets/AlFatiha_Layout/1.jpg';
import midImg from '../assets/AlFatiha_Layout/2.jpg';
import bismillahImg from '../assets/AlFatiha_Layout/3.jpg';
import bismillahBottomBorder from '../assets/AlFatiha_Layout/4.jpg';
import Slider from '@react-native-community/slider';
import Axios from 'axios';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import {saveBookMarks} from '../../redux/actions/surahAction';
import fb from '../assets/fb.jpg';
import twitter from '../assets/twitter.jpg';
import insta from '../assets/insta.jpg';
import pin from '../assets/pin.jpg';
import linked from '../assets/linked.jpg';
import whats from '../assets/whats.jpg';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const ShareModel = ({setShareModal, verseItem}) => {
  const shareToWhatsApp = (text) => {
    const APP_STORE_LINK =
      'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.whatsapp';
    Linking.canOpenURL(`whatsapp://send?text=${verseItem.text}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            'App not found',
            'Go and get it now',
            [
              {
                text: 'Get it now',
                onPress: () => {
                  if (Platform.OS == 'ios') {
                    Linking.openURL(APP_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  } else {
                    Linking.openURL(PLAY_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  }
                },
              },
              {text: 'cancel', onPress: () => {}, style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else {
          return Linking.openURL(
            `whatsapp://send?text=${
              verseItem.text + ' ' + 'Al-Quran' + ' ' + verseItem.number
            }`,
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const instagram = (text) => {
    const APP_STORE_LINK =
      'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.instagram.android';
    Linking.canOpenURL(`instagram://send?text=${verseItem.text}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            'App not found',
            'Go and get it now',
            [
              {
                text: 'Get it now',
                onPress: () => {
                  if (Platform.OS == 'ios') {
                    Linking.openURL(APP_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  } else {
                    Linking.openURL(PLAY_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  }
                },
              },
              {text: 'cancel', onPress: () => {}, style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else {
          return Linking.openURL(
            `instagram://send?text=${
              verseItem.text + ' ' + 'Al-Quran' + ' ' + verseItem.number
            }`,
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const linkedin = (text) => {
    const APP_STORE_LINK =
      'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.linkedin.android';
    Linking.canOpenURL(`linkedin://send?text=${verseItem.text}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            'App not found',
            'Go and get it now',
            [
              {
                text: 'Get it now',
                onPress: () => {
                  if (Platform.OS == 'ios') {
                    Linking.openURL(APP_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  } else {
                    Linking.openURL(PLAY_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  }
                },
              },
              {text: 'cancel', onPress: () => {}, style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else {
          return Linking.openURL(
            `linkedin://send?text=${
              verseItem.text + ' ' + 'Al-Quran' + ' ' + verseItem.number
            }`,
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const shareToFaebook = (text) => {
    const APP_STORE_LINK =
      'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.facebook.katana';
    Linking.canOpenURL(`facebook://send?text=${verseItem.text}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            'App not found',
            'Go and get it now',
            [
              {
                text: 'Get it now',
                onPress: () => {
                  if (Platform.OS == 'ios') {
                    Linking.openURL(APP_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  } else {
                    Linking.openURL(PLAY_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  }
                },
              },
              {text: 'cancel', onPress: () => {}, style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else {
          return Linking.openURL(
            `facebook://send?text=${
              verseItem.text + ' ' + 'Al-Quran' + ' ' + verseItem.number
            }`,
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const twitterShare = (text) => {
    const APP_STORE_LINK =
      'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.twitter.android';
    Linking.canOpenURL(`facebook://send?text=${verseItem.text}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            'App not found',
            'Go and get it now',
            [
              {
                text: 'Get it now',
                onPress: () => {
                  if (Platform.OS == 'ios') {
                    Linking.openURL(APP_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  } else {
                    Linking.openURL(PLAY_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  }
                },
              },
              {text: 'cancel', onPress: () => {}, style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else {
          return Linking.openURL(
            `facebook://send?text=${
              verseItem.text + ' ' + 'Al-Quran' + ' ' + verseItem.number
            }`,
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const pinShare = (text) => {
    const APP_STORE_LINK =
      'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.pinterest';
    Linking.canOpenURL(`facebook://send?text=${verseItem.text}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert(
            'App not found',
            'Go and get it now',
            [
              {
                text: 'Get it now',
                onPress: () => {
                  if (Platform.OS == 'ios') {
                    Linking.openURL(APP_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  } else {
                    Linking.openURL(PLAY_STORE_LINK).catch((err) =>
                      console.error('An error occurred', err),
                    );
                  }
                },
              },
              {text: 'cancel', onPress: () => {}, style: 'cancel'},
            ],
            {cancelable: false},
          );
        } else {
          return Linking.openURL(
            `facebook://send?text=${
              verseItem.text + ' ' + 'Al-Quran' + ' ' + verseItem.number
            }`,
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <View style={styles.shareBox}>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            selectable
            style={{color: 'black', fontSize: 14, marginLeft: 20}}>
            Share This Ayah
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#146199',
              marginRight: 30,
              padding: 3,
              borderRadius: 50,
            }}
            onPress={() => setShareModal(false)}>
            <Icon
              name="close"
              size={20}
              color="white"
              style={{elevation: 10, marginHorizontal: 6}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginHorizontal: 10,
          }}>
          <TouchableOpacity onPress={shareToFaebook}>
            <Image source={fb} style={{height: 50, width: 50}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={instagram}>
            <Image source={insta} style={{height: 50, width: 50}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={linkedin}>
            <Image source={linked} style={{height: 50, width: 50}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={twitterShare}>
            <Image source={twitter} style={{height: 50, width: 50}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareToWhatsApp}>
            <Image source={whats} style={{height: 50, width: 50}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={pinShare}>
            <Image source={pin} style={{height: 50, width: 50}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 40,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginHorizontal: 10,
            marginTop: 5,
            marginBottom: 5,
          }}>
          {/* <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'lightgray',
              borderRadius: 50,
              padding: 4,
              marginLeft: 8,
            }}
            onPress={() => navigation.navigate('CompareVerse', {verseNo})}>
            <Icons
              name="file-compare"
              color="#146199"
              style={{
                alignItems: 'center',
              }}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'lightgray',
              borderRadius: 50,
              padding: 3,
              paddingHorizontal: 7,
              marginLeft: 18,
            }}
            onPress={() =>
              navigation.navigate('Bookmarks', {verseNo: verseItem})
            }>
            <IconFoundation
              name="book-bookmark"
              style={{
                alignItems: 'center',
              }}
              color="#146199"
              size={28}
            />
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            height: 40,
            flexDirection: 'column',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            selectable
            style={{color: 'black', fontSize: 14, marginLeft: 20}}>
            or copy link
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              marginHorizontal: 20,
              marginTop: 5,
              color: '#146199',
              paddingHorizontal: 10,
            }}
            value="https://www.codingforums.com"
          />
        </View>
      </View>
    </>
  );
};

const Header = () => (
  <>
    <View style={styles.headerWrp}>
      <View style={styles.mostLeft}>
        <Image
          source={mosque}
          style={{marginLeft: width * 0.05, marginBottom: height * 0.02}}
        />
        <Text selectable style={styles.headerTxt}>
          Dhur1-Hijah 13, 1441AH
        </Text>
      </View>
      <View style={styles.headerMid}>
        <Image
          source={midImg}
          style={{height: height * 0.09, width: width * 0.16}}
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
          <Icon name="gear" size={25} color="black" style={{marginRight: 10}} />
          <IconFontisto name="more-v-a" size={30} color="black" />
        </View>
        <Text selectable style={styles.headerTxt}>
          Monday 3 August, 2020
        </Text>
      </View>
    </View>
  </>
);

const HomePage = ({
  navigation,
  route,
  translationEng,
  translationUr,
  appLanguage,
  currentFontColor,
}) => {
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  let [audio, setAudio] = useState(false);
  let [playing, setPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0, 1);

  const [isSeeking, setIsSeeking] = useState(false);

  

  const {position, duration} = useTrackPlayerProgress(250);
  const [engAyahState, setEngAyah] = useState(false);
  const [arabicAyahState, setArabicAyah] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(1);
  const [nextPlaying, setNextPlaying] = useState(1);
  const [prevPlaying, setPrevPlaying] = useState(1);
  const [shareModal, setShareModal] = useState(false);
  const [verseItem, setVerseItem] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
    };
    startPlayer();
  }, []);

  let {surahNumber} = route.params;
  useEffect(() => {
    Axios.get('https://api.alquran.cloud/v1/surah/' + surahNumber).then(
      (result) => {
        setArabicAyah(result.data.data);
        setNowPlaying(result.data.data.ayahs[0].number);
      },
    );
    let lang = appLanguage == 'en' ? translationEng : translationUr;
    Axios.get(
      'https://api.alquran.cloud/v1/surah/' + surahNumber + '/' + lang,
    ).then((result) => {
      setEngAyah(result.data.data);
    });
  }, []);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  const trackPlayerInit = async (number) => {
    TrackPlayer.setupPlayer();
  };
  const trackPlayer = async (number) => {
    TrackPlayer.add({
      id: 'trackId',
      url: `https://cdn.alquran.cloud/media/audio/ayah/ar.abdurrahmaansudais/${number}`,
      title: 'Track Title',
      artist: 'Track Artist',
      artwork: verse1,
    },null);
    TrackPlayer.play();
  };

  const onPause = () => {
    TrackPlayer.pause();
    setPlaying(false);
  };
  const onPlay = () => {
    trackPlayer(nowPlaying);
    setIsTrackPlayerInit(true);
    TrackPlayer.play();
    setPlaying(true);
  };
  const onPlayWithNumber = async (number) => {
    trackPlayer(number);
    setIsTrackPlayerInit(true);
    TrackPlayer.play();
    setPlaying(true);
    setNowPlaying(number);
  };
  const onStop = () => {
    TrackPlayer.stop();
    setPlaying(false);
  };
  const onBackward = () => {
    trackPlayer(nowPlaying - 1);
    setIsTrackPlayerInit(true);
    TrackPlayer.play();
    setPlaying(true);
    setNowPlaying(nowPlaying - 1);
  };
  const onForward = () => {
    trackPlayer(nowPlaying + 1);
    setIsTrackPlayerInit(true);
    setPlaying(true);
    setNowPlaying(nowPlaying + 1);
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };
  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking(false);
    setTimeout(() => {
      onPlayWithNumber(nowPlaying + 1);
    });
  };

  const saveAsBookMarks = (verseNo) => {
    dispatch(saveBookMarks(verseNo));
    Alert.alert('Book mark has been saved');
  };

  // const share = (verse) => {
  //   let options = {
  //     message: verse,
  //   };
  //   Share.open(options)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       err && console.log(err);
  //     });
  // };

  const savedBookMark = async (verseNo, arabicText) => {
    let result = await Axios.get(
      `https://api.alquran.cloud/v1/ayah/${verseNo}/en.asad`,
    );

    let obj = {
      arabicTxt: arabicText,
      text: result.data.data.text,
      surahNumber: surahNumber,
      surahName: result.data.data.surah.englishName,
      number: result.data.data.numberInSurah,
    };
    // console.log(obj);
    saveAsBookMarks(obj);
    setTimeout(() => {
      Alert.alert('Ayah has been bookmarked.');
    });
  };
  const scrollViewRef = useRef(null);
  
  	const handleClick = number => {
    	if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
            x: width * (5 + 1),
            animated: true,
        });
    }
    }

    const handleClickBCK =number => {
    	if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
            x: 0 ,
            animated: true,
        });
    }
  }
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1,backgroundColor:"#ffffff"}}>
        <Header />
        <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          
          <View style={styles.mostOuter}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image style={{marginTop: height * 0.01}} source={bismillahImg} />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                style={{marginTop: height * 0.001}}
                source={bismillahBottomBorder}
              />
            </View>

            <View
              style={{
                height: height * 0.1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: width * 0.7,
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <TouchableOpacity
                onPress={() => {
                  onBackward();
                }}>
                <Icon
                  name="step-backward"
                  size={15}
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    paddingVertical: 7,
                    paddingHorizontal: 10,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onStop}>
                <Icon
                  name="stop"
                  size={15}
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingHorizontal: 9,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPlay}>
                <Icon
                  name="play"
                  size={30}
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingLeft: 15,
                    paddingRight: 8,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPause}>
                <IconFontisto
                  name="pause"
                  size={15}
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingLeft: 10,
                    paddingRight: 8,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onForward();
                }}>
                <Icon
                  name="step-forward"
                  size={15}
                  style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    paddingVertical: 8,
                    paddingLeft: 10,
                    paddingRight: 8,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Slider
                style={{width: width * 0.9, height: 10}}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="black"
                maximumTrackTintColor="#000000"
                value={sliderValue}
                onSlidingStart={slidingStarted}
                onSlidingComplete={slidingCompleted}
                
              />
            </View>
            <Interstitial navigation={navigation} />
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{height: height * 0.55}}>
              {arabicAyahState ? (
                arabicAyahState.ayahs.map((item, key) => (
                  <View style={styles.verseContainer} key={key}>
                    <View
                      style={{
                        width: width * 0.4,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <ImageBackground
                        source={verse1}
                        style={{
                          height: height * 0.065,
                          width: width * 0.09,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text selectable style={{fontSize: 12}}>
                          {item.number}
                        </Text>
                      </ImageBackground>
                      <View style={{marginLeft: 5, paddingTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() => {
                              savedBookMark(item.number, item.text);
                              // saveAsBookMarks(item)
                            }}>
                            <Icons name="bookmark" size={15} color="#146199" />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              setShareModal(item);
                              setVerseItem(item);
                            }}>
                            <IconEntypo
                              name="share"
                              size={15}
                              color="#146199"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => onPlayWithNumber(item.number)}>
                            <Icon
                              name="play"
                              size={15}
                              style={{
                                marginLeft: 5,
                              }}
                              color="#146199"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        width: width * 0.58,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            marginRight: width * 0.02,
                            color: currentFontColor,
                          }}>
                          {item.text.includes(
                            'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                          )
                            ? item.text.slice(38, item.text.length)
                            : item.text}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <ActivityIndicator
                  color="#146199"
                  size="large"
                  style={{marginTop: height * 0.2}}
                />
              )}
            </ScrollView>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: height * 0.01,
                marginBottom: height * 0.01,
              }}>
              <Icons onPress={() => handleClickBCK(1)} name="arrow-left-drop-circle" size={25} color="#146199" />

              <ScrollView 
                ref={scrollViewRef}
                // contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}
                horizontal={true}>
                <TouchableOpacity onPress={() => navigation.navigate('Timer')}>
                  <Icons
                    name="timer-outline"
                    size={20}
                    style={styles.iconLang}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate('SelectQari')}>
                  <IconAntDesign
                    name="layout"
                    size={20}
                    style={styles.iconshare}
                  />
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => setShareModal(!shareModal)}>
                  <Icon
                    name="share-alt-square"
                    size={20}
                    style={styles.iconshare}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('SelectQari')}>
                  <Icon name="font" size={20} style={styles.iconshare} />
                </TouchableOpacity>
                <Icon name="search" size={20} style={styles.iconshare} />
                <IconEntypo
                  name="select-arrows"
                  size={20}
                  style={styles.iconshare}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Bookmarks')}>
                  <IconMaterial
                    name="collections-bookmark"
                    size={20}
                    style={styles.iconshare}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CompareVerse')}>
                  <Icons
                    name="select-compare"
                    size={20}
                    style={styles.iconshare}
                  />
                </TouchableOpacity>
                {/* <Icons name="play" size={20} style={styles.iconshare} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('AppLanguage')}>
                  <IconIonic
                    name="language"
                    size={20}
                    style={styles.iconshare}
                  />
                </TouchableOpacity>
              </ScrollView>
              <Icons onPress={() => handleClick(1)} name="arrow-right-drop-circle" size={25} color="#146199" />
            </View>
          </View>
        </View>
        {shareModal ? (
          <ShareModel
            shareModal={shareModal}
            setShareModal={setShareModal}
            verseItem={verseItem}
          />
        ) : null}
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
  verseContainer: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    borderBottomColor: '#146199',
    borderBottomWidth: 2,
    // height: height * 0.1,
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
  iconLang: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  iconshare: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
  },
  shareBox: {
    backgroundColor: 'white',
    height: 200,
    width: width * 0.99,
    position: 'absolute',
    elevation: 15,
    zIndex: 20,
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

let mapStateToProps = (state) => ({
  translationEng: state.SurahReducer.translationEng,
  translationUr: state.SurahReducer.translationUr,
  appLanguage: state.SurahReducer.appLanguage,
  currentFontColor: state.ViewMode.currentFontColor,
});

export default connect(mapStateToProps)(HomePage);
