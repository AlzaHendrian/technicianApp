import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UseAppContext } from '../context';

const Navbar = () => {
  const { state } = UseAppContext();
  const {isLogin: isLoggedIn} = state.authentication
  const navigation = useNavigation();
  const changeProfile = () => {
    navigation.navigate('Profile');
  }
  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={changeProfile}>
            <Icon name="user" size={40} color="#900"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={40} color="#900"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="gear" size={40} color="#900"/>
          </TouchableOpacity>  
        </View>
      </View>
    );
  } else {
    return null
  }
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    padding: 40,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Navbar;
