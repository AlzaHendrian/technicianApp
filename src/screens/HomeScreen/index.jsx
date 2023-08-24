import {View, Text} from 'react-native';
import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Button from '../../component/Button';
import {UseAppContext} from '../../context';
import {logoutAction} from '../../context/action/authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const {dispatch} = UseAppContext();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    dispatch(logoutAction());
  };
  return (
    <View
      style={{
        backgroundColor: '#DDDDDD',
        height: '100%',
      }}>
      <Header />
      <Menu />
    </View>
  );
};

export default HomeScreen;
