import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {UseAppContext} from '../../context';
import {logoutAction} from '../../context/action/authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingScreen = () => {
  const {dispatch} = UseAppContext();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    dispatch(logoutAction());
  };
  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        <Text style={[styles.cell, styles.headerCell]}>Pusat Bantuan</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={[styles.cell, styles.headerCell]}>Laporkan Masalah</Text>
      </View>
      <Pressable onPress={handleLogout}>
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.headerCell]}>Keluar</Text>
        </View>
      </Pressable>
      {/* Add more rows as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 16,
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
});

export default SettingScreen;
