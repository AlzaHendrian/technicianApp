import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {UseAppContext} from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {state} = UseAppContext();
  const {user: userData} = state.authentication;
  // const [profile, setProfile] = useState([])
  // console.log("INI IMAGE",userData.image_1920)
  const navigation = useNavigation();

  // console.log("INI USER DATA NYAAA :", userData)

  const imageSource = `data:image/png;base64,${userData.image_1920}`;

  const changeToUpdateProfile = props => {
    const {partnerID, username, password} = props;
    navigation.navigate('Update Profile', {partnerID, username, password});
    // console.log('click me uhuy')
    console.log('PARTNER ID :', partnerID);

    // useEffect(() => {
    //     console.log("profile datas request");
    //     refreshProfile();
    // }, [partnerID]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{uri: imageSource}} style={styles.image} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Update Picture', {pic: imageSource});
          }}
          style={[
            {
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 20,
              right: 10,
              borderRadius: 30,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Icon name="edit" size={20} color="#900" />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoContainer}>
        <TouchableOpacity
          onPress={() =>
            changeToUpdateProfile({
              partnerID: userData.partner_id[0],
              username: userData.email, // Contoh properti lainnya
              password: userData.password, // Contoh properti lainnya
              // refresh: refreshProfile(),
            })
          }
          style={styles.editIconContainer}>
          <Icon name="edit" size={20} color="#900" />
        </TouchableOpacity>

        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData?.name}</Text>
        </View>

        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData?.email}</Text>
        </View>
        <View style={styles.userInfoItem}>
          <Text style={styles.label}>Mobile:</Text>
          <Text style={styles.value}>{userData?.mobile}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Background color for the whole screen
  },
  editIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Make the image circular
    marginBottom: 20,
  },
  userInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProfileScreen;
