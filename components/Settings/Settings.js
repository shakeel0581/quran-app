

import React,{useState} from 'react';
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
  Alert
} from 'react-native';
import leftTop from '../assets/homepage/1.png';
import rightTop from '../assets/homepage/3.png';
import rightBottom from '../assets/homepage/2.png';
import leftBottom from '../assets/homepage/4.png';
import midIMG from '../assets/homepage/5.png';
import kaabaImg from '../assets/kabba_white.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {showAllOptionAction} from '../../redux/actions/settingAction'
import { connect, useDispatch} from 'react-redux'
import fb from '../assets/fb.jpg';
import twitter from '../assets/twitter.jpg';
import insta from '../assets/insta.jpg';
import pin from '../assets/pin.jpg';
import linked from '../assets/linked.jpg';
import whats from '../assets/whats.jpg';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const ShareModel = ({
  setShareModal,
  verseItem,
}) => {
  let verse = "https://www.googleplaystore.com/quranapp"
  const shareToWhatsApp = (text) => {
    const APP_STORE_LINK =
      'itms://itunes.apple.com/us/app/apple-store/myiosappid?mt=8';
    const PLAY_STORE_LINK =
      'https://play.google.com/store/apps/details?id=com.whatsapp';
    Linking.canOpenURL(`whatsapp://send?text=${verseItem.text}&via="Quran App"`)
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
            `whatsapp://send?text=${verse}&via="Quran App"
            `,
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
    Linking.openURL(
      'https://www.linkedin.com/shareArticle?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    )
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
            'https://www.linkedin.com/shareArticle?text=' +
              verse +
              '&url=https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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
    Linking.canOpenURL(
      `https://www.facebook.com/sharer/sharer.php?quote=${verseItem.text}`,
    )
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
            `https://www.facebook.com/sharer/sharer.php?text=${
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
    Linking.canOpenURL(`https://twitter.com/intent/tweet?text=${verseItem}`)
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
            `https://twitter.com/intent/tweet?text=${verse}`,
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
            Share Our App To Your friends
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
            value="https://www.googleplaystore.com/quranapp"
          />
        </View>
      </View>
    </>
  );
};

const HomePage = ({navigation}) => {
  let dispatch = useDispatch()
  const [shareModal, setShareModal] = useState(false);

  return (
    <>
    <Interstitial navigation={navigation} />
      <StatusBar barStyle="dark-content" backgroundColor="white"/>
      <SafeAreaView style={{flex:1}}>
        
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}
          <View style={styles.mostOuter}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.05,
              }}>
              <TouchableOpacity title="Info" color="#fff"  
              onPress={() => navigation.navigate('SearchFromSetting')}
              >
                <Icon
                  name="search"
                  size={35}
                  color="white"
                  style={[styles.iconBtn, {paddingHorizontal: 16}]}
                />
              </TouchableOpacity>
              <TouchableOpacity title="Info" color="#fff" 
              onPress={() => navigation.navigate('Bookmarks')}>
                <Icon
                  name="bookmark"
                  size={35}
                  color="white"
                  style={[styles.iconBtn, {paddingHorizontal: 20}]}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.02,
              }}>
              <TouchableOpacity title="Info" color="#fff" onPress={()=> {
                dispatch(showAllOptionAction(false))
                  setTimeout(() => {
                    Alert.alert('Options has been hidden.')
                  })
                }}>
                {/* Hide all Options */}
                <Icon
                  name="eye-slash"
                  size={35}
                  color="white"
                  style={[styles.iconBtn, {paddingHorizontal: 15}]}
                />
              </TouchableOpacity>
              <TouchableOpacity title="Info" color="#fff" onPress={()=> {
                dispatch(showAllOptionAction(true))
                setTimeout(() => {
                  Alert.alert('You can see all the options.')
                })
                }}>
                {/* Show all Options */}
                <Icon
                  name="eye"
                  size={35}
                  color="white"
                  style={styles.iconBtn}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.02,
              }}>
              <TouchableOpacity title="Info" color="#fff" onPress={()=> setShareModal(!shareModal)}>
                <Icon
                  name="share-alt-square"
                  size={35}
                  color="white"
                  style={[styles.iconBtn, {paddingHorizontal: 17}]}
                />
              </TouchableOpacity>
              <TouchableOpacity title="Info" color="#fff" onPress={() => navigation.navigate('QiblaDirection')} style={{backgroundColor:'#146199',padding: 8, paddingHorizontal:15, marginRight: 15}}>
                <Image source={kaabaImg} style={{height: 40,width:40}}/>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.02,
              }}>
              <TouchableOpacity title="Info" color="#fff" onPress={()=> navigation.navigate("QuranLanguage")}>
                <Icons
                  name="language"
                  size={35}
                  color="white"
                  style={[styles.iconBtn, {paddingHorizontal: 10}]}
                />
              </TouchableOpacity>
              <TouchableOpacity title="Info" color="#fff" onPress={()=> navigation.navigate("Dictionary")}>
                <Icon
                  name="language"
                  size={35}
                  color="white"
                  style={[styles.iconBtn, {paddingHorizontal: 20}]}
                />
              </TouchableOpacity>
           
            </View>
      
            <ImageBackground
              source={require('../assets/common/1.png')}
              style={{height: height * 0.36}}
              resizeMethod="resize"
              resizeMode="stretch">
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{marginTop: height * 0.25}} onPress={()=> navigation.navigate("Al_Fatiha_Layout")}>
                  <Image
                    source={require('../assets/common/3.jpg')}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
        <Banner />
      </SafeAreaView>
      {shareModal ? (
          <ShareModel
            shareModal={shareModal}
            setShareModal={setShareModal}
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
  iconBtn: {
    backgroundColor: '#146199',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 15,
  },
  shareBox: {
    backgroundColor: 'white',
    height: 180,
    width: width * 0.99,
    position: 'absolute',
    elevation: 15,
    zIndex: 20,
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default HomePage;
