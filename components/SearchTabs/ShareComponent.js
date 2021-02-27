import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFoundation from 'react-native-vector-icons/Foundation';
import fb from '../assets/fb.jpg';
import twitter from '../assets/twitter.jpg';
import insta from '../assets/insta.jpg';
import pin from '../assets/pin.jpg';
import linked from '../assets/linked.jpg';
import whats from '../assets/whats.jpg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {saveBookMarks} from '../../redux/actions/surahAction';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const ShareModel = ({
  setShareModal,
  verseNo,
  verseItem,
  engAyahState,
  selectedArabicAyahState,
  engSearch,
  shareModal,
  ayahSearch,
  surahSearch,
  arabicSearch,
  selectedUrduAyah,
}) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  let verse =
  shareModal.surahArabicName +
  ', آیت نمبر ' +
  shareModal.number +
  ` \n\n` +
  'Surah ' +
  shareModal.surahName +
  ' Verse no ' +
  shareModal.number+
  `\n\n` +
  shareModal.arabicTxt +
  `\n\n` +
  shareModal.text;

  // useEffect(() => {
  //   console.log(shareModal);
  //   if (engSearch) {
  //     verse =
  //       shareModal.text +
  //       `\n` +
  //       'Surah ' +
  //       shareModal.surahName +
  //       ' Verse no ' +
  //       shareModal.number;
  //   }
  //   if (ayahSearch) {
  //     verse =
  //       shareModal.arabic +
  //       `\n` +
  //       shareModal.surahArabicName +
  //       ' آیت نمبر ' +
  //       shareModal.ayahNumber +
  //       `\n` +
  //       shareModal.urdu +
  //       ` \n` +
  //       'Surah ' +
  //       shareModal.surahName +
  //       ' Verse no ' +
  //       shareModal.ayahNumber;
  //   }
  //   if (surahSearch) {
  //     verse = shareModal.text + `\n` + ' Verse no ' + shareModal.numberInSurah;
  //   }
  //   if (arabicSearch) {
  //     verse =
  //       shareModal.text +
  //       `\n` +
  //       'Translation ' +
  //       `\n` +
  //       selectedUrduAyah +
  //       `\n` +
  //       'Surah ' +
  //       shareModal.surah.englishName +
  //       ' Verse no ' +
  //       shareModal.numberInSurah;
  //   }
  // }, []);
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
          <TouchableOpacity
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
            onPress={() => {
              let obj = {
                number: shareModal.number,
                text: shareModal.text,
                arabicTxt: shareModal.arabicTxt,
                surahNumber: shareModal.surahNumber,
                surahName: shareModal.surahName,
                surahArabicName: shareModel.surahArabicName
              };
              // console.log(obj);
              dispatch(saveBookMarks(obj));
              setTimeout(() => {
                Alert.alert('Ayah has been bookmarked.');
              });
            }}>
            <IconFoundation
              name="book-bookmark"
              style={{
                alignItems: 'center',
              }}
              color="#146199"
              size={28}
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
              navigation.navigate('SearchNextPrev', {
                surahNumber: shareModal.surahNumber,
                verseNo: shareModal.number,
              })
            }>
            <IconFoundation
              name="page-search"
              style={{
                alignItems: 'center',
              }}
              color="#146199"
              size={28}
            />
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
            value="https://www.hscodeditors.com"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default ShareModel;
