import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const TombolUpdate = () => {
    const navigation = useNavigation()
    // const changeForm = () => {
    //     navigation.navigate('Update Detail')
    // }

    return (
    <TouchableOpacity onPress={() => navigation.navigate('Update Detail')}>
        <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>update</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#82CD47',
    padding: 5,
    paddingHorizontal: 16,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6, // Hanya untuk platform Android
  },
  buttonText: {
    color: 'white',
  },
});

export default TombolUpdate;
