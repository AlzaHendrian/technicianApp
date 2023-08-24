import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {UseAppContext} from '../context';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MessageScreen from '../screens/MessageScreen';
import Navbar from '../component/Navbar';
import RegisterScreen from '../screens/RegisterScreen';
import useAsyncStorage from '../hooks/useAsyncStorage';
import {loginAction} from '../context/action/authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign'
import SettingScreen from '../screens/SettingScreen/Index';
import TicketList from '../screens/DashboardScreen/TicketList';
import UpdateProfile from '../screens/ProfileScreen/Update';
import UpdatePicture from '../screens/ProfileScreen/UpdatePicture';
import DetailTicket from '../screens/DashboardScreen/DetailTicket/DetailTicket';
import DetailBar from '../screens/DashboardScreen/DetailTicket/Component/DetailBar';
import DataCenter from '../screens/DataCenterScreen';
import Visit from '../screens/DataCenterScreen/Visit';
import Visitor from '../screens/DataCenterScreen/Visitor';
import UpdateDetail from '../screens/DashboardScreen/DetailTicket/Update/UpdateDetail';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="Home" 
      component={RootStack} 
      options={{
        headerBackTitle: 'back',
        tabBarLabel: 'home',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={'#78C1F3'} size={26} />
        ),
      }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerBackTitle: 'back',
          tabBarLabel: 'profile',
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={'#78C1F3'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerBackTitle: 'back',
          tabBarLabel: 'setting',
          tabBarIcon: ({ color }) => (
            <Icon name="setting" color={'#78C1F3'} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Data Center"
        component={DataCenter}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Detail Bar"
        component={DetailBar}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketList}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Update Profile"
        component={UpdateProfile}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Update Picture"
        component={UpdatePicture}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Update Detail"
        component={UpdateDetail}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Visit"
        component={Visit}
        options={{headerBackTitle: 'back'}}
      />
      <Tab.Screen
        name="Visitor"
        component={Visitor}
        options={{headerBackTitle: 'back'}}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const {state, dispatch} = UseAppContext();
  const {authentication} = state;

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const value = await AsyncStorage.getItem('userData');
        // console.log(value);
        if (value !== null) {
          dispatch(loginAction(JSON.parse(value)));
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      {authentication.isLogin ? <BottomTab /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default Navigation;
