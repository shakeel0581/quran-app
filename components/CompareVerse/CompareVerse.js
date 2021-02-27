/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect, useState} from 'react';
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

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import verse1 from '../assets/QuranRead/1.png';
import Axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector, connect} from 'react-redux';
import {
  getCompareVerses1,
  getCompareVerses2,
  clearVersesList,
  sortVersesInCompare,
  sortToggleAyah,
  sortVersesInCompareAfterSorting,
} from '../../redux/actions/surahAction';
import CheckBox from 'react-native-check-box';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({
  navigation,
  route,
  verses1List,
  verses2List,
  markedVersesInCompare,
  filterMarkedVerses,
}) => {
  const [verse1, setVerse1] = useState([]);
  const [verse2, setVerse2] = useState([]);
  const [data, setData] = useState();
  const [selectedValue1, setSelectedValue1] = useState('java');
  const [selectedValue2, setSelectedValue2] = useState('java');
  const [splitView, setSplitView] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState([]);

  let verseNo = false;
  if (route.params) {
    verseNo = route.params.verseNo;
  }

  let verseToBeCompare = useSelector(
    (state) => state.SurahReducer.ayahsTobeCompare,
  );
  let dispatch = useDispatch();

  useEffect(() => {
    setVerse1(verses1List);
    setVerse2(verses2List);
    // console.log(verse2)
  }, [verses1List, verses2List]);

  const onPress = async () => {
    dispatch(clearVersesList());

    if (!verseNo) {
      setVerse1([]);
      setVerse2([]);
      for (let i = 0; i < verseToBeCompare.length; i++) {
        dispatch(getCompareVerses1(verseToBeCompare[i], selectedValue1));
        dispatch(getCompareVerses2(verseToBeCompare[i], selectedValue2));
      }
    } else {
      dispatch(getCompareVerses1(verseNo, selectedValue1));
      dispatch(getCompareVerses2(verseNo, selectedValue2));
    }
  };
  const onPressSort = async () => {
    dispatch(clearVersesList());
    // console.log("verseToBeCompare on sort");
    // console.log(verseToBeCompare);
    setVerse1([]);
    setVerse2([]);
    for (let i = 0; i < toggleCheckBox.length; i++) {
      dispatch(getCompareVerses1(toggleCheckBox[i], selectedValue1));
      dispatch(getCompareVerses2(toggleCheckBox[i], selectedValue2));
    }
  };
  useEffect(() => {
    Axios.get('https://api.alquran.cloud/v1/edition').then((item) => {
      let resp = item.data.data;
      var sortedArray = resp.sort(function (a, b) {
        if (a.englishName < b.englishName) return -1;
        else if (a.englishName > b.englishName) return 1;
        return 0;
      });
      setData(sortedArray);
    });
    dispatch(clearVersesList());
  }, []);

  const selectedVerse = (item, number) => {
    // dispatch(sortVersesInCompare(toggleCheckBox));
  };

  const isItemChecked = (abilityName) => {
    return toggleCheckBox.indexOf(abilityName) > -1;
  };

  const manageToggle = (evt, abilityName) => {
    console.log('abilityName');
    console.log(abilityName);
    if (isItemChecked(abilityName)) {
      setToggleCheckBox(toggleCheckBox.filter((i) => i !== abilityName));
    } else {
      setToggleCheckBox([...toggleCheckBox, abilityName]);
    }
  };

  useEffect(() => {
    // selectedVerse();
    console.log(toggleCheckBox);
  }, [toggleCheckBox]);

  // useEffect(() => {
  //   console.log(filterMarkedVerses)
  //   if (filterMarkedVerses) {
  //     onPressSort(filterMarkedVerses);
  //   }
  // }, [filterMarkedVerses]);

  const updateAyah = () => {
    dispatch(sortVersesInCompareAfterSorting(toggleCheckBox));
    onPressSort();
    // dispatch(sortToggleAyah(toggleCheckBox));
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
              Compare Ayah
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              selectable
              style={{fontSize: height * 0.03, marginTop: height * 0.005}}>
              From
            </Text>
            <Picker
              selectedValue={selectedValue1}
              style={{height: 50, width: width * 0.6}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue1(itemValue)
              }>
              {data
                ? data.map((item, key) => (
                    <Picker.Item
                      label={item.englishName}
                      value={item.identifier}
                      key={key}
                    />
                  ))
                : null}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text
              selectable
              style={{fontSize: height * 0.03, marginTop: height * 0.005}}>
              To
            </Text>
            <Picker
              selectedValue={selectedValue2}
              style={{height: 50, width: width * 0.6}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue2(itemValue)
              }>
              {data
                ? data.map((item, key) => (
                    <Picker.Item
                      label={item.englishName}
                      value={item.identifier}
                      key={key}
                    />
                  ))
                : null}
            </Picker>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#146199',
                width: width * 0.3,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => setSplitView(!splitView)}>
              <Text selectable style={{color: 'white'}}>
                Change View
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: '#146199',
                width: width * 0.3,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => updateAyah(!splitView)}>
              <Text selectable style={{color: 'white'}}>
                Sort
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 10,

                backgroundColor: '#146199',
                width: width * 0.3,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={onPress}>
              <Text selectable style={{color: 'white'}}>
                Compare
              </Text>
            </TouchableOpacity>
          </View>
          <Interstitial navigation={navigation} />
      
          {splitView ? (
            // Split View Start
            <ScrollView style={{height: height * 0.26}}>
              {verse2.length > 0 ? (
                <>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View style={[{flex: 0.55}]}>
                      <Text
                        style={{color: 'black', fontSize: 18, marginLeft: 10}}>
                        From{' '}
                      </Text>
                    </View>

                    <View style={[{flex: 0.55}]}>
                      <Text
                        style={{color: 'black', fontSize: 18, marginLeft: 10}}>
                        To{' '}
                      </Text>
                    </View>
                  </View>
                  {verse2.map((item, key) => (
                    <Fragment key={key}>
                      <Text
                        selectable
                        style={{marginTop: 10, textAlign: 'center'}}>
                        Surah Name: {item.surah.englishName} Verse No. {item.number}
                      </Text>
                      <CheckBox
                        isChecked={isItemChecked(item.number)}
                        onClick={(evt) => {
                          manageToggle(evt, item.number);
                        }}
                        style={{marginLeft: 10}}
                        checkBoxColor="#146199"
                      />
                      <View style={styles.verseContainer}>
                        <View
                          style={[
                            styles.verseOuterRight,
                            styles.borderRight,
                            {marginBottom: 0, paddingRight: 10},
                          ]}>
                          {verse1
                            ? verse1.length > 0
                              ? verse1.map((itemV, key) => {
                                  if (itemV.number == item.number)
                                    return (
                                      <Text
                                        selectable
                                        style={[styles.arabicVerse]}
                                        key={key}>
                                        {itemV.text.includes(
                                          'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                                        )
                                          ? itemV.text.slice(
                                              38,
                                              itemV.text.length,
                                            )
                                          : itemV.text}
                                      </Text>
                                    );
                                })
                              : null
                            : null}
                        </View>
                        <View
                          style={[styles.verseOuterRight, {marginBottom: 20}]}>
                          <Text
                            selectable
                            style={[styles.arabicVerse, {marginLeft: 8}]}>
                            {item.text.includes(
                              'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                            )
                              ? item.text.slice(38, item.text.length)
                              : item.text}
                          </Text>
                        </View>
                      </View>
                    </Fragment>
                  ))}
                </>
              ) : (
                <Text selectable style={{padding: 20, fontSize: 18}}>
                  No Verses Selected to Compare
                </Text>
              )}
            </ScrollView>
          ) : (
            // Split View End
            // Full View Start
            <ScrollView style={{height: height * 0.26}}>
              {verse2.length > 0 ? (
                <>
                  {verse2.map((item, key) => (
                    <Fragment key={key}>
                      <View
                        style={[
                          styles.verseContainer,
                          {flexDirection: 'column', marginTop: 10},
                        ]}>
                        <View style={[{flex: 0.55}]}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 14,
                              marginLeft: 10,
                            }}>
                            From: Surah: {item.surah.englishName} Verse No {item.number}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.verseOuterRight,
                            {
                              width: width * 0.9,
                              borderBottomWidth: 1,
                              borderBottomColor: '#146199',
                            },
                          ]}>
                          <CheckBox
                            isChecked={isItemChecked(item.number)}
                            onClick={(evt) => {
                              manageToggle(evt, item.number);
                            }}
                            style={{marginLeft: 10}}
                            checkBoxColor="#146199"
                          />
                          <Text
                            selectable
                            style={[styles.arabicVerse, {width: '100%'}]}>
                            {verse1
                              ? verse1.length > 0
                                ? verse1.map((itemV, key) => {
                                    if (itemV.number == item.number)
                                      return (
                                        <Text
                                          selectable
                                          style={[styles.arabicVerse]}
                                          key={key}>
                                          {itemV.text.includes(
                                          'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                                        )
                                          ? itemV.text.slice(
                                              38,
                                              itemV.text.length,
                                            )
                                          : itemV.text}
                                        </Text>
                                      );
                                  })
                                : null
                              : null}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.verseContainer,
                          {flexDirection: 'column',borderBottomColor:'black',borderBottomWidth:2},
                        ]}>
                        <View style={[{flex: 0.55}]}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 14,
                              marginLeft: 10,
                            }}>
                            To: Surah: {item.surah.englishName} Verse No {item.number}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.verseOuterRight,
                            {width: width * 0.9},
                          ]}>
                          <Text
                            selectable
                            style={[styles.arabicVerse, {marginLeft: 5}]}>
                         {item.text.includes(
                              'سْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ',
                            )
                              ? item.text.slice(38, item.text.length)
                              : item.text}
                          </Text>
                        </View>
                        {/* <Image source={require("../assets/AlFatiha_Layout/7.png")} style={{height:10,width:'100%'}}/> */}
                      </View>
                    </Fragment>
                  ))}
                </>
              ) : (
                // Full View End
                <Text selectable style={{padding: 20, fontSize: 18}}>
                  No Result
                </Text>
              )}
            </ScrollView>
          )}
          <Banner />
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
    marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verseContainer: {
    flexDirection: 'row',
    marginTop: height * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  borderRight: {
    borderRightColor: '#146199',
    borderRightWidth: 2,
  },
  verseNumberImg: {marginLeft: 10},
  verseOuterRight: {width: width * 0.46},
  arabicVerse: {
    fontSize: 20,
    color: '#146199',
    marginBottom: 10,
    fontFamily: 'Al_Qalam_Quran_2',
  },
  iconBtn: {
    backgroundColor: '#146199',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 15,
  },
});
let mapStateToProps = (state) => ({
  verses1List: state.ViewMode.versesList1,
  verses2List: state.ViewMode.versesList2,
  markedVersesInCompare: state.ViewMode.markedVersesInCompare,
  filterMarkedVerses: state.ViewMode.filterMarkedVerses,
});
export default connect(mapStateToProps)(HomePage);
