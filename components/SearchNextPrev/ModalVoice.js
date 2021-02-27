import React from 'react';
import {
  StyleSheet,
  View,
  Text,

  Dimensions,
  TouchableOpacity,
  
} from 'react-native';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';



let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


const ModalVoice = () => {
  return (
    <>
      <View style={styles.dialogueVoice}>
        <View
          style={{
            position: 'absolute',
            top: -27,
            elevation: 20,
            left: width * 0.5,
          }}>
          <IconAntDesign
            name="caretup"
            size={40}
            color="white"
            style={{elevation: 10}}
          />
        </View>
        <View
          style={{
            height: 40,
            backgroundColor: '#146199',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon
            name="search"
            size={20}
            color="white"
            style={{elevation: 10, marginHorizontal: 6}}
          />
          <Text selectable style={{color: 'white', fontSize: 12}}>
            Search in Arabic:
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', flex: 0.7}}>
            <View
              style={{
                height: 15,
                width: 15,
                backgroundColor: '#146199',
                marginHorizontal: 5,
              }}></View>
            <Text selectable style={{fontSize: 12, color: '#146199'}}>
              Quran
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 15,
                width: 15,
                backgroundColor: '#146199',
                marginHorizontal: 5,
              }}></View>
            <Text selectable style={{fontSize: 12, color: '#146199'}}>
              Translation
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row', flex: 0.74}}>
            <View
              style={{
                height: 15,
                width: 15,
                backgroundColor: '#146199',
                marginHorizontal: 5,
              }}></View>
            <Text selectable style={{fontSize: 12, color: '#146199'}}>
              Partial Match
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 15,
                width: 15,
                backgroundColor: '#146199',
                marginHorizontal: 5,
              }}></View>
            <Text selectable style={{fontSize: 12, color: '#146199'}}>
              Exact Match
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <View style={{marginHorizontal: 60}}>
            <IconMaterial
              name="keyboard-voice"
              size={30}
              color="#146199"
              style={[styles.iconshare, {borderRadius: 50}]}
            />
          </View>
          <TouchableOpacity>
            <Text selectable style={{fontSize: 14, fontWeight: '700'}}>
              Jump To Verse
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              padding: 5,
              paddingHorizontal: 8,
              backgroundColor: 'black',
              borderRadius: 25,
            }}>
            <Text
              selectable
              style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
              Chapter No
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              paddingHorizontal: 8,
              backgroundColor: 'black',
              borderRadius: 25,
            }}>
            <Text
              selectable
              style={{fontSize: 14, fontWeight: '700', color: 'white'}}>
              Verse No
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
 
  iconshare: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
  },
  
  dialogueVoice: {
    backgroundColor: 'white',
    height: 250,
    width: 230,
    position: 'absolute',
    elevation: 10,
    zIndex: 20,
    top: 65,
    left: width * 0.3,
  }
});

export default ModalVoice