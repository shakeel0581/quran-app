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
  FlatList,
} from 'react-native';

import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icons from 'react-native-vector-icons/FontAwesome5';

import {Picker} from '@react-native-picker/picker';
import {changeCityNameForNamaz} from '../../redux/actions/settingAction'
import {useDispatch, useSelector} from 'react-redux'

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({navigation}) => {
  const cityList = [
    'Ahmadpur East',
    'Ahmed Nager Chatha',
    'Ali Khan Abad',
    'Alipur',
    'Arifwala',
    'Attock',
    'Bhera',
    'Bhalwal',
    'Bahawalnagar',
    'Bahawalpur',
    'Bhakkar',
    'Burewala',
    'Chenab Nagar',
    'Chillianwala',
    'Choa Saidanshah',
    'Chakwal',
    'Chak Jhumra',
    'Chichawatni',
    'Chiniot',
    'Chishtian',
    'Chunian',
    'Dajkot',
    'Daska',
    'Davispur',
    'Darya Khan',
    'Dera Ghazi Khan',
    'Dhaular',
    'Dina',
    'Dinga',
    'Dhudial Chakwal',
    'Dipalpur',
    'Faisalabad',
    'Fateh Jang',
    'Ghakhar Mandi',
    'Gojra',
    'Gujranwala',
    'Gujrat',
    'Gujar Khan',
    'Harappa',
    'Hafizabad',
    'Haroonabad',
    'Hasilpur',
    'Haveli Lakha',
    'Jalalpur Jattan',
    'Jampur',
    'Jaranwala',
    'Jhang',
    'Jhelum',
    'Kallar Syedan',
    'Kalabagh',
    'Karor Lal Esan',
    'Kasur',
    'Kamalia',
    'Karachi',
    'Kāmoke',
    'Khanewal',
    'Khanpur',
    'Khanqah Sharif',
    'Kharian',
    'Khushab',
    'Kot Adu',
    'Jauharabad',
    'Lahore',
    'Islamabad',
    'Lalamusa',
    'Layyah',
    'Lawa Chakwal',
    'Liaquat Pur',
    'Lodhran',
    'Malakwal',
    'Mamoori',
    'Mailsi',
    'Mandi Bahauddin',
    'Mian Channu',
    'Mianwali',
    'Miani',
    'Multan',
    'Murree',
    'Muridke',
    'Mianwali Bangla',
    'Muzaffargarh',
    'Narowal',
    'Nankana Sahib',
    'Okara',
    'Renala Khurd',
    'Pakpattan',
    'Pattoki',
    'Pindi Bhattian',
    'Pind Dadan Khan',
    'Pir Mahal',
    'Qaimpur',
    'Qila Didar Singh',
    'Raiwind',
    'Rajanpur',
    'Rahim Yar Khan',
    'Rawalpindi',
    'Sadiqabad',
    'Sagri',
    'Sahiwal',
    'Sambrial',
    'Samundri',
    'Sangla Hill',
    'Sarai Alamgir',
    'Sargodha',
    'Shakargarh',
    'Sheikhupura',
    'Shujaabad',
    'Sialkot',
    'Sohawa',
    'Soianwala',
    'Siranwali',
    'Tandlianwala',
    'Talagang',
    'Taxila',
    'Toba Tek Singh',
    'Vehari',
    'Wah Cantonment',
    'Wazirabad',
    'Yazman',
    'Zafarwal',
  ];

  const [state, setState] = useState('Faisalabad');
  let dispatch = useDispatch()
  const namazTiming = [
    {title: 'Fajar', time: '05:46 AM'},
    {title: 'Dhuhr', time: '12:25 PM'},
    {title: 'Asr', time: '03:23 PM'},
    {title: 'Maghrib', time: '05:43 PM'},
    {title: 'Isha', time: '07:04 PM'},
  ];

  let namazCity = useSelector(state => state.ViewMode.namazCity)

  useEffect(()=>{
    setState(namazCity)
  },[namazCity])

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          height: '100%',
          backgroundColor: 'white',
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={{width: '100%', alignItems: 'center', marginTop: '2%'}}>
          <Text style={{fontSize: 22}}>Namaz Timing</Text>
        </View>
        <Interstitial navigation={navigation} />
      
        <View
          style={{
            width: '80%',
            alignItems: 'center',
            marginTop: '2%',
            borderColor: '#146199',
            borderWidth: 1,
            height: '60%',
            borderRadius: 10,
            marginTop:'40%'
          }}>
          {namazTiming.map((item, key) => (
            <View
              style={{
                height: '17%',
                borderBottomColor: '#146199',
                borderBottomWidth: 1,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={key}>
              <Text style={{fontSize: 16, marginHorizontal: 10}}>
                {item.title}
              </Text>
              <Text style={{fontSize: 16, marginHorizontal: 10}}>
                {item.time}
              </Text>
            </View>
          ))}
          <Picker
            selectedValue={state}
            style={{height: 50, width: "100%"}}
            onValueChange={(itemValue, itemIndex) =>{
              setState(itemValue)
              dispatch(changeCityNameForNamaz(itemValue))
            }
            }>
              {cityList.map((item,key)=>(
                <Picker.Item label={item} value={item} key={key} />
                ))}
          </Picker>
        </View>
        <Banner />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default HomePage;
