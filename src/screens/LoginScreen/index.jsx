import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UseAppContext} from '../../context';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import {loginAction} from '../../context/action/authentication';
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from '@react-native-community/geolocation';

const LoginScreen = () => {
  const {state, dispatch} = UseAppContext();
  const {value, storeValue, removeValue} = useAsyncStorage('userData');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const navigation = useNavigation();

  const changeRegister = () => {
    navigation.navigate('Register');
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude.toString()); // Convert to string if needed
        setLongitude(longitude.toString()); // Convert to string if needed
      },
      error => {
        console.error(error);
        alert("LOKASI TIDAK DAPAT DI TEMUKAN!")
      }
    );
  };

  const handleLogin = async () => {
    getLocation(); // Call getLocation directly
    
    console.log('clicked');

    try {
      const body = {
        model: 'res.users',
        url: 'http://10.21.29.200:8069',
        db: 'XRP2023DEV',
        username: username,
        password: password,
        latitude: latitude,
        longitude: longitude,
      };

      const formData = new URLSearchParams();
      Object.keys(body).map(key => formData.append(key, body[key]));

      // console.log(formData);

      // const formData = qs.stringify(body);

      const {data: response} = await axios.post(
        `http://mid.tachyon.net.id/api/login`,
        formData.toString(),
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
      );
      // const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      const userData = {...response.data, password: password};

      await storeValue(userData);
      dispatch(loginAction(userData));
      alert('login sukses')
    } catch (error) {
      alert(error.message);
      console.log('err login', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.container_register}>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity onPress={changeRegister}>
          <Text style={{marginTop: 4, color: 'blue'}}>
            Please register to create one.
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  container_register: {
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginScreen;
