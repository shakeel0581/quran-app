import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonic from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {changeViewBorderBottom} from '../../redux/actions/settingAction';
import {useDispatch} from 'react-redux';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const HomePage = ({setModalVisible, modalVisible, setLayoutBox, layoutBox}) => {
  const navigation = useNavigation();
  // const [modalVisible, setModalVisible] = useState(false);
  // const [layoutBox, setLayoutBox] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  let dispatch = useDispatch();

  const changeBottomView = () => {
    dispatch(changeViewBorderBottom());
    Alert.alert('Divider has been changed.');
  };

  const scrollViewRef = React.useRef(null);
  
  	const handleClick = number => {
    	if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
            x: width * (5 + 1),
            animated: true,
        });
    }
    }

    const handleClickBCK =number => {
    	if (scrollViewRef.current !== null) {
        scrollViewRef.current.scrollTo({
            x: 0 ,
            animated: true,
        });
    }
  }

  return (
    <>
      <View style={styles.iconOuterbottom}>
        <Icons onPress={() => handleClickBCK(1)} name="arrow-left-drop-circle" size={25} color="#146199" />

        <ScrollView
        ref={scrollViewRef}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          horizontal={true}>
          <TouchableOpacity onPress={() => navigation.navigate('Timer')}>
            <Icons name="timer-outline" size={20} style={styles.iconLang} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLayoutBox(!layoutBox)}>
            <IconAntDesign name="layout" size={20} style={styles.iconshare} />
          </TouchableOpacity>
         
          <TouchableOpacity onPress={() => navigation.navigate('SearchTabs')}>
            <Icon name="search" size={20} style={styles.iconshare} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Icon name="font" size={20} style={styles.iconshare} />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeBottomView}>
            <Icons
              name="border-bottom-variant"
              size={20}
              style={{
                alignItems: 'center',
                padding: 10,
                borderWidth: 1,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Bookmarks')}>
            <IconMaterial
              name="collections-bookmark"
              size={20}
              style={styles.iconshare}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CompareVerse')}>
            <Icons name="select-compare" size={20} style={styles.iconshare} />
          </TouchableOpacity>
          {/* <Icons name="play" size={20} style={styles.iconshare} /> */}
          {/* <TouchableOpacity onPress={() => navigation.navigate('AppLanguage')}>
            <IconIonic name="language" size={20} style={styles.iconshare} />
          </TouchableOpacity> */}
        </ScrollView>
        <Icons onPress={() => handleClick(1)}  name="arrow-right-drop-circle" size={25} color="#146199" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },

  iconOuterbottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
  },
  iconLang: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  iconshare: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default HomePage;
