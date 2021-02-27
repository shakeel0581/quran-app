/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import leftTop from '../assets/homepage/1.png';
import rightTop from '../assets/homepage/3.png';
import rightBottom from '../assets/homepage/2.png';
import leftBottom from '../assets/homepage/4.png';
import midIMG from '../assets/homepage/5.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {quranicLanguage} from '../../redux/actions/surahAction';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

const Header = () => {
  let navigation = useNavigation()
  return (
  <>
    <View style={styles.headerWrp}>
      <TouchableOpacity title="Info" color="#fff" onPress={()=> {
        navigation.goBack()
      }}>
        <Icon
          name="chevron-left"
          size={25}
          color="black"
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <Image
        source={require('../assets/common/2.png')}
        style={{marginLeft: width * 0.15}}
      />
    </View>
  </>
)};
const HomePage = ({navigation, quranicLanguage}) => {
  const arrylang = [
    {title: 'Al Qalam Quran', fontName: 'Al_Qalam_Quran_2'},
    {title: 'Islamic Font', fontName: 'islamic_font'},
    {title: 'MUHAMMADI QURANIC', fontName: 'MUHAMMADI_QURANIC_FONT'},
    {title: 'PDMS Saleem', fontName: '_PDMS_Saleem_QuranFont'},
    {title: 'Noor-e-Hira', fontName: 'noorehira_Regular'},
    {title: 'Noor-e-Huda', fontName: 'noorehuda_Regular'},
    {title: 'Othmani', fontName: 'Othmani_Regular'},
    {title: 'Scheherazade', fontName: 'Scheherazade_Regular'},
  ];

  return (
    <>
    <Interstitial navigation={navigation} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          scrollEnabled={false}
          style={styles.scrollView}>
          <Header />
          
          <View style={styles.mostOuter}>
            <View style={styles.languagesDiv}>
              <View style={styles.languagesHeader}>
                <Text selectable style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                  Select Quran in any Language
                </Text>
              </View>
              <View style={styles.languagesList}>
                <ScrollView style={[styles.languagesInner, styles.shadow]}>
                  {/* <View > */}
                  <View style={styles.languagesOuterShadow}>
                    <TextInput
                      placeholder="Select Language"
                      style={styles.languageInput}
                    />
                  </View>
                  {arrylang.map((item, key) => {
                    return (
                      <TouchableOpacity
                        key={key}
                        style={styles.selectQari}
                        onPress={() => {
                          quranicLanguage(item.fontName);
                          alert('Language Changed');
                          navigation.navigate('Al_Fatiha_Layout');
                        }}>
                        <Text selectable style={{color: '#6291B3'}}>{item.title}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  {/* </View> */}
                </ScrollView>

                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="chevron-down"
                    size={25}
                    color="#DE9E39"
                    style={{
                      paddingLeft: 10,
                      paddingTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ImageBackground
              source={require('../assets/common/1.png')}
              style={styles.bottomImg}
              resizeMethod="resize"
              resizeMode="stretch">
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={()=> navigation.navigate("Al_Fatiha_Layout")}>
                <Image
                  source={require('../assets/common/3.jpg')}
                  style={{marginTop: height * 0.22}}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </ScrollView>
        <Banner />
      </SafeAreaView>
    </>
  );
};
let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  headerWrp: {
    height: height * 0.1,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingVertical: height * 0.02,
  },
  headerIcon: {paddingLeft: 10, paddingTop: height * 0.015},
  mostOuter: {
    backgroundColor: '#ffffff',
  },
  languagesDiv: {
    height: height * 0.44,
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.03,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  languagesHeader: {
    height: height * 0.075,
    backgroundColor: '#146199',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languagesList: {
    height: height * 0.4,
    backgroundColor: 'white',
    padding: 5,
  },
  languagesInner: {
    height: height * 0.343,
    borderColor: 'lightgray',
  },
  shadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  languagesOuterShadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  languageInput: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    height: height * 0.05,
    fontSize: 14,
    padding: 3,
    margin: height * 0.01,
  },
  selectQari: {
    padding: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  bottomImg: {height: height * 0.31},
});

export default connect(null, {quranicLanguage})(HomePage);
