import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomePage from './components/homePage/homePage';
import QuranLanguage from './components/QuranLanguage/QuranLanguage';
import AppLanguage from './components/AppLanguage/AppLanguage';
import SelectQari from './components/SelectQari/SelectQari';
import Settings from './components/Settings/Settings';
import NamazPage from './components/NamazPage/NamazPage';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Al_Fatiha_Layout from './components/Al-Fatiha_Layout/Al-Fatiha_Layout';
import AlFatiha from './components/Al-Fatiha/Al-Fatiha';
import Quran_Verse from './components/Quran_Verse/Quran_Verse';
import SearchTabs from './components/SearchTabs/SearchTabs';
import CompareVerse from './components/CompareVerse/CompareVerse';
import Translation from './components/Translations/Translation';
import QiblaDirection from './components/QiblaDirection/QiblaDirection';
import SearchFromSetting from './components/SearchFromSetting/SearchFromSetting';
import SearchNextPrev from './components/SearchNextPrev/SearchNextPrev';
import SearchTabsByContent from './components/SearchTabsByContent/SearchTabs';
import Dictionary from './components/Dictionary/Dictionary';

import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';

const Stack = createStackNavigator();

let mapStateToProps = (store) => {
  return {
    themedark: store.SurahReducer.dark,
  };
};

const HomeScreen = connect(
  mapStateToProps,
  null,
)(() => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QuranLanguage"
            component={QuranLanguage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AppLanguage"
            component={AppLanguage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectQari"
            component={SelectQari}
            options={{
              headerLeft: () => (
                <Image
                  source={require('./components/assets/common/4.png')}
                  style={{height: 50, width: 50}}
                />
              ),
              headerRight: () => (
                <Image
                  source={require('./components/assets/common/5.png')}
                  style={{height: 50, width: 50}}
                />
              ),
              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerLeft: () => (
                <Image
                  source={require('./components/assets/common/4.png')}
                  style={{height: 50, width: 50}}
                />
              ),
              headerRight: () => (
                <Image
                  source={require('./components/assets/common/5.png')}
                  style={{height: 50, width: 50}}
                />
              ),
              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            }}
          />
          <Stack.Screen
            name="Timer"
            component={NamazPage}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}
                  >
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="Bookmarks"
            component={Bookmarks}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="AlFatiha"
            component={AlFatiha}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="SearchNextPrev"
            component={SearchNextPrev}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="Translation"
            component={Translation}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="SearchTabs"
            component={SearchTabs}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="SearchTabsByContent"
            component={SearchTabsByContent}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="SearchFromSetting"
            component={SearchFromSetting}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="QiblaDirection"
            component={QiblaDirection}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="CompareVerse"
            component={CompareVerse}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="Dictionary"
            component={Dictionary}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  title="Info"
                  color="#fff"
                  onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-left"
                    size={25}
                    color="#146199"
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
              ),

              headerTitle: () => (
                <Image
                  source={require('./components/assets/common/2.png')}
                  style={{height: 50, width: 230}}
                />
              ),
              headerStyle: {
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
              },
            })}
          />
          <Stack.Screen
            name="Al_Fatiha_Layout"
            component={Al_Fatiha_Layout}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Quran_Verse"
            component={Quran_Verse}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
}
export default App;
