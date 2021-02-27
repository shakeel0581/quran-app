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
} from 'react-native';
import leftTop from '../assets/homepage/1.png';
import rightTop from '../assets/homepage/3.png';
import rightBottom from '../assets/homepage/2.png';
import leftBottom from '../assets/homepage/4.png';
import midIMG from '../assets/homepage/5.png';


const HomePage = ({navigation}) => {
  setTimeout(() => {navigation.navigate("Al_Fatiha_Layout")}, 1000);
  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView>
          <View style={styles.mostOuter}>
            <View style={styles.topWrp}>
              <View style={styles.topLeft}>
                <Image source={leftTop} style={styles.topLeftImg} />
              </View>
              <View style={styles.topRight}>
                <Image source={rightTop} style={styles.topRightImg} />
              </View>
            </View>
            <View style={styles.midWrp}>
              <View style={styles.midOut}>
                <Image source={midIMG} style={styles.midImg} />
              </View>
            </View>
            {/* <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>HS Codeditors Trail</Text> */}
            <View style={styles.bottomWrp}>
              <View style={styles.topLeft}>
                <Image source={leftBottom} style={styles.topLeftImg} />
              </View>
              <View style={styles.topRight}>
                <Image source={rightBottom} style={styles.topRightImg} />
              </View>
            </View>
          </View>
      </SafeAreaView>
    </>
  );
};
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    // flex:1
    height:Dimensions.get('window').height
  },
  mostOuter: {
    backgroundColor: '#ffffff',
  },
  topWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height * 0.15,
  },
  bottomWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topLeftImg: {
    height: height * 0.25,
    width: width * 0.5,
  },
  topRightImg: {
    height: height * 0.25,
    width: width * 0.5,
  },
  midWrp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.56,
  },
});

export default HomePage;
