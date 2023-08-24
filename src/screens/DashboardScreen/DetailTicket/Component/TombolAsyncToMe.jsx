import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UseAppContext } from '../../../../context';
import axios from 'axios';


const AssignToMe = ({detailID}) => {
    const {state, dispatch} = UseAppContext();
    const {user} = state.authentication;
    const updateUserID = async () => {
        const userID = new URLSearchParams();
        userID.append('url', 'http://10.21.29.200:8069')
        userID.append('db', 'XRP2023DEV')
        userID.append('model', 'helpdesk.ticket')
        userID.append('user_id', user.name)
        userID.append('record_id', detailID)
        userID.append('username', user.email)
        userID.append('password', user.password)
        console.log('clicked user ID 1')

        console.log("INI ID DARI DETAIL ID", detailID);

        try {
            console.log('clicked user ID 2')
            const response = await axios.put('http://mid.tachyon.net.id/api/update', userID.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

            console.log('INI RESPONSE TOMBOL ASSIGN :', response)

        }catch(error) {
            console.log('clicked user ID 3')
            console.log(JSON.stringify(error, null, 4));
        }
    }

    return (
    <TouchableOpacity onPress={updateUserID}>
        <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Assign to me</Text>
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

export default AssignToMe;
