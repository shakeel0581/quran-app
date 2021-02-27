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
} from 'react-native';
import leftTop from '../assets/homepage/1.png';
import rightTop from '../assets/homepage/3.png';
import rightBottom from '../assets/homepage/2.png';
import leftBottom from '../assets/homepage/4.png';
import midIMG from '../assets/homepage/5.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {changeAppLanguage} from '../../redux/actions/surahAction';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";
const Header = () => {
  
  let navigation = useNavigation()

  return(
  <>
    <View style={styles.headerWrp}>
      <TouchableOpacity title="Info" color="#fff" onPress={()=>  navigation.goBack()}>
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
)}
const HomePage = ({navigation}) => {
  let dispatch = useDispatch()
  const appLang = [
    {name: 'English', key: 'en'},
    {name: 'Urdu', key: 'ur'},
    // {name: 'Arabic', key: 'ar'},
    // {name: 'Dutch', key: 'du'},
    // {name: 'Spanish', key: 'sp'},
    // {name: 'German', key: 'gr'},
  ];

  const changeLang = (key)=>{
    console.log(key);
    dispatch(changeAppLanguage(key))
    // navigation.navigate('SelectQari')
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <Interstitial navigation={navigation} />
      
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={styles.mostOuter}>
            <View style={styles.languagesDiv}>
              <View style={styles.languagesHeader}>
                <Text selectable style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                  Select App Language
                </Text>
              </View>
              <View style={styles.languagesList}>
                <View style={[styles.languagesInner, styles.shadow]}>
                  <View style={styles.languagesOuterShadow}>
                    <TextInput
                      placeholder="Select Language"
                      style={styles.languageInput}
                    />
                  </View>
                  {appLang.map((item, key) => {
                    return (
                      <TouchableOpacity
                        key={key}
                        style={styles.selectQari}
                        onPress={() => changeLang(item.key)}>
                        <Text selectable style={{color: '#6291B3'}}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

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
              <TouchableOpacity
                onPress={() => navigation.navigate('Al_Fatiha_Layout')}
                style={{alignSelf: 'center', alignItems: 'center',borderWidth:1,width:70,height:60,marginTop: height * 0.22}}>
                <Image
                  source={require('../assets/common/3.jpg')}
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

export default HomePage;
