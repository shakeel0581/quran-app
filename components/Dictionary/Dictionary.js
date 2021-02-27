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
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import Banner from "../Admobs/Banner";
import Interstitial from "../Admobs/Interstitial";

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import IconCommunity from 'react-native-vector-icons/Foundation';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import verse1 from '../assets/QuranRead/1.png';
import Axios from 'axios';
import {connect, useDispatch} from 'react-redux';
import CheckBox from 'react-native-check-box';
import {versesForCompare, saveBookMarks} from '../../redux/actions/surahAction';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({
  navigation,
  translationEng,
  appLanguage,
  translationUr,
  fontFamilyName,
  route,
}) => {
  const [radioValue, setRadioValue] = useState('Ayat');
  const [value, setValue] = useState();
  const [reslut, setResult] = useState();
  const [surah, setSurah] = useState();
  const [engWordResultArr, setEngWord] = useState();
  const [arbWordResultArr, setArabicWord] = useState();
  const [selectedDetails, setSelectedDetails] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [selectedUrduAyah, setSelectedUrduAyah] = useState(false);
  const [verseItem, setVerseItem] = useState(false);
  const [verseNo, setVerse] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState([]);
  // let {englishText, arabicText} = route.params;
  let dispatch = useDispatch();

  var radio_props = [
    {label: `Ayat`, value: 'Ayat'},
    {label: 'Surah', value: 'Surah'},
    {label: 'Arabic Word', value: 'Arabic Word'},
    {label: 'English Word', value: 'English Word'},
  ];
  const onPress = (e) => {
    setValue('');
    setResult(false);
    setSurah(false);
    setEngWord(false);
    setArabicWord(false);
    setRadioValue(e);
  };
  let lang = appLanguage == 'en' ? translationEng : translationUr;
  const searchHandler = () => {
    
  };

  const selectedVerse = (item, number) => {
    dispatch(versesForCompare(toggleCheckBox));
  };

  const isItemChecked = (abilityName) => {
    return toggleCheckBox.indexOf(abilityName) > -1;
  };

  const manageToggle = (evt, abilityName) => {
    if (isItemChecked(abilityName)) {
      setToggleCheckBox(toggleCheckBox.filter((i) => i !== abilityName));
    } else {
      setToggleCheckBox([...toggleCheckBox, abilityName]);
    }
  };
  useEffect(() => {
    selectedVerse();
  }, [toggleCheckBox]);
  useEffect(() => {
    setTimeout(() => {
      searchHandler();
    },2000);
  }, [radioValue]);

  useEffect(() => {
  
  }, []);

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
              style={{fontSize: 24, marginTop: height * 0.005}}>
              <Icon name="search" size={20} /> Dictionary
            </Text>
            <Text
              selectable
              style={{fontSize: height * 0.03, marginTop: height * 0.002}}>
              Select word for meaning
            </Text>
          </View>
          

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: width * 0.05,
              marginTop:20
            }}>
            <TextInput
              style={{borderWidth: 1, flex: 1}}
              onChangeText={(text) => setValue(text)}
              value={value}
            />
            <TouchableOpacity
              style={{backgroundColor: '#146199'}}
              onPress={searchHandler}>
              <Icon
                name="search"
                size={25}
                style={{padding: 13}}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Interstitial navigation={navigation} />
      
          <ScrollView style={{height: height * 0.26}}>
            
          </ScrollView>
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
    justifyContent: 'space-around',
    marginTop: height * 0.005,
    borderBottomColor: '#146199',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  verseNumberImg: {marginLeft: 10},
  verseOuterRight: {width: width * 0.8},
  arabicVerse: {
    paddingRight: 15,
    fontSize: 24,
    color: '#146199',
    marginBottom: 10,
    fontFamily: 'Al_Qalam_Quran_2',
    textAlign: 'right',
  },
  engVerse: {
    paddingRight: 20,
  },
  iconBtn: {
    backgroundColor: '#146199',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 15,
  },
});
let mapStateToProps = (state) => ({
  translationEng: state.SurahReducer.translationEng,
  translationUr: state.SurahReducer.translationUr,
  appLanguage: state.SurahReducer.appLanguage,
  fontFamilyName: state.SurahReducer.fontFamily,
});

export default connect(mapStateToProps, null)(HomePage);
