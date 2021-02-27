import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {quranicLanguage} from '../../redux/actions/surahAction';
import {connect, useDispatch} from 'react-redux';

import {
  fontSizeEngAction,
  fontSizeArAction,
} from '../../redux/actions/surahAction';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const ModalFont = connect((state) => ({
  fontSizeEng: state.SurahReducer.fontSizeEng,
  fontSizeAr: state.SurahReducer.fontSizeAR,
}))(({fontSizeEng, fontSizeAr}) => {
  const [arabicSize, setArabicSize] = useState(1);
  const [translationSize, setTranslationSize] = useState(1);
  const [fontSizeSection, setFontsizeSection] = useState(false);
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

  useEffect(() => {
    setTranslationSize(fontSizeEng);
    setArabicSize(fontSizeAr);
  });

  let dispatch = useDispatch();

  return (
    <>
      <View style={styles.dialogueFontWrp}>
        {fontSizeSection ? (
          <React.Fragment>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{fontSize: 20, fontWeight: '700', flex: 0.7}}
                onPress={() => setModalVisible(!modalVisible)}>
                Arabic
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeArAction(arabicSize + 1));
                  }}>
                  <Icon
                    name="plus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: '700',
                      paddingHorizontal: 10,
                    }}>
                    {arabicSize}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeArAction(arabicSize - 1));
                  }}>
                  <Icon
                    name="minus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                // marginTop: height * 0.03,
                marginBottom: height * 0.025,
              }}>
              <Text
                selectable
                style={{fontSize: 20, fontWeight: '700', flex: 0.7}}>
                Translation
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeEngAction(translationSize + 1));
                  }}>
                  <Icon
                    name="plus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: '700',
                      paddingHorizontal: 10,
                    }}>
                    {translationSize}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={() => {
                    dispatch(fontSizeEngAction(translationSize - 1));
                  }}>
                  <Icon
                    name="minus"
                    size={20}
                    color="white"
                    style={{padding: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: '700', marginBottom: 15}}
              onPress={() => setModalVisible(!modalVisible)}>
              Select Quranic Font
            </Text>
            <ScrollView
              style={{
                flexDirection: 'column',
              }}>
              {arrylang.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    style={{
                      fontSize: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: '#146199',
                      marginBottom: 1,
                    }}
                    onPress={() => {
                      dispatch(quranicLanguage(item.fontName));
                      alert('Language Changed');
                    }}>
                    <Text selectable style={{color: '#6291B3'}}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
        <View
          style={{
            height: 40,
            backgroundColor: '#146199',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => setFontsizeSection(true)}>
            <Text style={{color: 'white', fontSize: 14}}>Font Size</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontsizeSection(false)}>
            <Text style={{color: 'white', fontSize: 14}}>Font Family</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            position: 'absolute',
            bottom: -27,
            right: 30,
          }}>
          <IconAntDesign
            name="caretdown"
            size={40}
            color="white"
            style={{elevation: 10}}
          />
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  dialogueFontWrp: {
    backgroundColor: 'white',
    height: 250,
    width: 180,
    position: 'absolute',
    elevation: 10,
    zIndex: 20,
    bottom: 80,
    left: width * 0.23,
  },

  plusBtn: {
    paddingHorizontal: 2,
    backgroundColor: '#146199',
  },
});

export default ModalFont;
