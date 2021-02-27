/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
  ImageBackground,
} from 'react-native';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import CompassHeading from 'react-native-compass-heading';
import compassImg from '../assets/qibla.png';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({navigation}) => {
  const [compassHeading, setCompassHeading] = useState(0);
  useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, (degree) => {
      setCompassHeading(degree);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Interstitial navigation={navigation} />
      
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          flex:1
        }}>
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize: 18,textAlign:'center'}}>Turn on your location, to get the exact location</Text>
        </View>
        <Image
          style={[
            styles.image,
            {transform: [{rotate: `${360 - compassHeading}deg`}]},
          ]}
          resizeMode="contain"
          source={compassImg}
        />
        <Banner />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '90%',
    height: '80%',
    alignSelf: 'center',
  },
});

export default HomePage;
