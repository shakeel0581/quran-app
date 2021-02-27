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
  Alert,
} from 'react-native';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {quranTranslationUr} from '../../redux/actions/surahAction';
import {useNavigation} from '@react-navigation/native';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const Translation = ({route}) => {
  const [data, setData] = useState();
  const [engData, setEngData] = useState();
  const [showUrdu, setUrdu] = useState();
  const [showEng, setEng] = useState();
  const navigation = useNavigation();
  let {lang} = route.params;

  useEffect(() => {
    Axios.get('https://api.alquran.cloud/v1/edition?language=ur').then(
      (item) => {
        let resp = item.data.data;
        setData(resp);
      },
    );
    Axios.get('https://api.alquran.cloud/v1/edition?language=en').then(
      (item) => {
        let resp = item.data.data;
        setEngData(resp);
      },
    );
    if (lang == 'urdu') {
      setUrdu(true);
    } else {
      setEng(true);
    }
  }, []);

  let dispatch = useDispatch();
  const selectUrTranslation = (item) => {
    Alert.alert('Translation has been changed');
    navigation.goBack();
    dispatch(quranTranslationUr(item));
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* <Header /> */}
        <View style={styles.mostOuter}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text selectable style={{fontSize: height * 0.03, marginTop: height * 0.005}}>
              Select any Translation
            </Text>
          </View>
          <Interstitial navigation={navigation} />
      <Banner />
          <ScrollView>
            {showUrdu ? (
              <View style={{}}>
                {data
                  ? data.map((item, key) => (
                      <TouchableOpacity
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                          padding: 10,
                        }}
                        key={key}
                        onPress={() => selectUrTranslation(item.identifier)}>
                        <Text selectable style={{fontSize: 16}}>{item.name}</Text>
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            ) : null}

            {showEng ? (
              <View style={{}}>
                {engData
                  ? engData.map((item, key) => (
                      <TouchableOpacity
                        style={{
                          borderBottomColor: 'black',
                          borderBottomWidth: 1,
                          padding: 10,
                        }}
                        key={key}
                        onPress={() => selectUrTranslation(item.identifier)}>
                        <Text selectable style={{fontSize: 16}}>{item.name}</Text>
                      </TouchableOpacity>
                    ))
                  : null}
              </View>
            ) : null}
          </ScrollView>
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
    height: height * 0.918,
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

export default Translation;
