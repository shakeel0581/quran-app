/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
} from 'react-native';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, connect} from 'react-redux';
import {
  saveBookMarks,
  removeBookMark,
  removeBookMarkSurah,
} from '../../redux/actions/surahAction';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({navigation, route, bookmarkAyahList, bookmarkSurahList}) => {
  const [bookMarkAyahs, setBookMarkAyahs] = useState([]);
  const [bookMarkSurahs, setBookMarkSurahs] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const arry = [
    {name: 'Al-Fatiha', desc: 'The Opening (Ayah 7)'},
    {name: 'Al-Fatiha', desc: 'The Opening (Ayah 7)'},
    {name: 'Al-Fatiha', desc: 'The Opening (Ayah 7)'},
    {name: 'Al-Fatiha', desc: 'The Opening (Ayah 7)'},
    {name: 'Al-Fatiha', desc: 'The Opening (Ayah 7)'},
    {name: 'Al-Fatiha', desc: 'The Opening (Ayah 7)'},
  ];
  let verseNo = false;
  if (route.params) {
    verseNo = route.params.verseNo;
  }
  let dispatch = useDispatch();
  useEffect(() => {
    if (verseNo) {
      // dispatch(saveBookMarks(verseNo));
    }
  }, []);
  useEffect(() => {
    setBookMarkAyahs(bookmarkAyahList);
    setBookMarkSurahs(bookmarkSurahList);
    // console.log(bookmarkAyahList);
  }, [bookmarkAyahList, bookmarkSurahList]);

  let remove = (item) => {
    dispatch(removeBookMark(item));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.mostOuter}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Icon
              name="bookmark-sharp"
              size={35}
              color="#146199"
              style={{marginTop: 10}}
            />
            <Text style={{fontSize: height * 0.04, marginTop: height * 0.005}}>
              Bookmarks
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height * 0.01,
            }}>
            <Text style={{fontSize: height * 0.025, marginTop: height * 0.005}}>
              Saved Book Mark's
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: activePage == 1 ? '#146199' : 'white',
                borderWidth: 1,
                borderColor: '#146199',
                marginRight: 5,
                borderRadius: 5,
              }}
              onPress={() => setActivePage(1)}>
              <Text
                style={{
                  fontSize: 16,
                  color: activePage == 2 ? '#146199' : 'white',
                  padding: 10,
                }}>
                Surah List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: activePage == 2 ? '#146199' : 'white',
                borderWidth: 1,
                borderColor: '#146199',
                borderRadius: 5,
              }}
              onPress={() => setActivePage(2)}>
              <Text
                style={{
                  fontSize: 16,
                  color: activePage == 1 ? '#146199' : 'white',
                  padding: 10,
                }}>
                Ayah List
              </Text>
            </TouchableOpacity>
          </View>
          <Interstitial navigation={navigation} />
      
          {/* 1 for surah 2 for ayah list */}
          {activePage == 1 ? (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{height: height * 0.34}}>
              <View style={{marginTop: height * 0.035}}>
                {bookMarkSurahs.length > 0 ? (
                  bookMarkSurahs.map((item, key) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#146199',
                        paddingHorizontal: 10,
                      }}
                      key={key}
                      onPress={() =>
                        navigation.navigate('AlFatiha', {
                          surahNumber: item.number,
                        })
                      }
                      >
                      <View
                        style={{flexDirection: 'column', width: width * 0.7}}>
                        <Text
                          style={{
                            fontSize: height * 0.025,
                            marginTop: height * 0.005,
                          }}
                          selectable>
                          {item.englishName}
                        </Text>
                        <Text
                          style={{
                            fontSize: height * 0.015,
                            marginTop: height * 0.005,
                          }}
                          selectable>
                          Surah No. {item.number} {item.englishNameTranslation}{' '}
                          (Ayah {item.c})
                        </Text>
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity
                          onPress={() => dispatch(removeBookMarkSurah(key))}>
                          <Icons
                            name="delete"
                            size={35}
                            color="#146199"
                            style={{marginTop: 10}}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#146199',
                      paddingHorizontal: 10,
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontSize: height * 0.025,
                          marginTop: height * 0.005,
                        }}
                        selectable>
                        No Saved Bookmarked
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          ) : (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{height: height * 0.34}}>
              <View style={{marginTop: height * 0.035}}>
                {bookMarkAyahs.length > 0 ? (
                  bookMarkAyahs.map((item, key) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomWidth: 1.5,
                        borderBottomColor: '#146199',
                        paddingHorizontal: 10,
                      }}
                      key={key}
                      onPress={() =>
                        navigation.navigate('AlFatiha', {
                          surahNumber: item.surahNumber,
                        })
                      }>
                      <View
                        style={{flexDirection: 'column', width: width * 0.7}}>
                        <View
                          style={{flexDirection: 'row', width: width * 0.7}}>
                          <Text
                            style={{
                              fontSize: height * 0.02,
                              marginTop: height * 0.005,
                            }}
                            selectable>
                            Surah Number {item.surahNumber}{' '}
                          </Text>
                          <Text
                            style={{
                              fontSize: height * 0.02,
                              marginTop: height * 0.005,
                            }}
                            selectable>
                            Verse No. {item.number}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: height * 0.015,
                            marginTop: height * 0.005,
                          }}
                          selectable>
                          {item.arabicTxt.includes(
                            'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                          )
                            ? item.arabicTxt.slice(38, item.arabicTxt.length)
                            : item.arabicTxt}
                        </Text>
                        <Text
                          style={{
                            fontSize: height * 0.015,
                            marginTop: height * 0.005,
                          }}
                          selectable>
                          {item.text}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'column'}}>
                        <TouchableOpacity onPress={() => remove(key)}>
                          <Icons
                            name="delete"
                            size={35}
                            color="#146199"
                            style={{marginTop: 10}}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 1.5,
                      borderBottomColor: '#146199',
                      paddingHorizontal: 10,
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          fontSize: height * 0.025,
                          marginTop: height * 0.005,
                        }}
                        selectable>
                        No Saved Bookmarked
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
          <Banner />
        </View>
        {/* </ScrollView> */}
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
  iconBtn: {
    backgroundColor: '#146199',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 15,
  },
});

let mapStatetoProps = (state) => {
  return {
    bookmarkAyahList: state.SurahReducer.bookmarkAyahList,
    bookmarkSurahList: state.SurahReducer.bookmarkSurahList,
  };
};

export default connect(mapStatetoProps, null)(HomePage);
