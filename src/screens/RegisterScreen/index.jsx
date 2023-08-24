import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // const navigation = useNavigation();

  const changeLogin = () => {
    navigation.navigate('Login');
  }

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
        alert('Email and password cannot be empty!');
        return;
      }

    // Lakukan logika pendaftaran pengguna di sini (tidak diimplementasikan dalam contoh ini).
    // Simpan informasi pengguna ke database atau server.
    // Setelah pendaftaran berhasil, Anda dapat mengarahkan pengguna kembali ke halaman login.

    // Contoh sederhana, ketika pendaftaran berhasil, langsung arahkan ke halaman LoginScreen.
    alert('Login Successful!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
        <TouchableOpacity onPress={changeLogin}>
          <Text style={{marginTop: 4, color: 'blue'}}>Please register to create one.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
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
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
});

export default RegisterScreen;
