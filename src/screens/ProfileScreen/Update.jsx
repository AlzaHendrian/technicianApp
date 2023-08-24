import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react"; // Import React
import { View, TextInput, Text, TouchableOpacity } from "react-native";

const UpdateProfile = () => {
    const route = useRoute();
    const { partnerID, username, password } = route.params;
    const navigation = useNavigation();

  const [updateProfile, setUpdateProfile] = useState({
    url: 'http://10.21.29.200:8069',
    db: 'XRP2023DEV',
    username: username,
    password: password,
    model: 'res.partner',
    record_id: partnerID,
    name: '',
    mobile: '',
  });

  const handleOnChange = (name, value) => {
    setUpdateProfile({
      ...updateProfile,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    try {
      const profileData = new URLSearchParams();
      profileData.append('url', updateProfile.url);
      profileData.append('db', updateProfile.db);
      profileData.append('username', updateProfile.username);
      profileData.append('password', updateProfile.password);
      profileData.append('model', updateProfile.model);
      profileData.append('id', updateProfile.record_id);
      profileData.append('field[name]', updateProfile.name);
      profileData.append('field[mobile]', updateProfile.mobile);

      const response = await axios.put(
        'http://mid.tachyon.net.id/api/update',
        profileData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('UPDATE PROFILE', response.data); // Assuming response contains useful data
      // Reset form after submission
      setUpdateProfile({
        ...updateProfile,
        name: '',
        mobile: '',
      });

      navigation.goBack();

      // You might want to trigger a refresh or navigation here
    } catch (err) {
      console.log('ERROR SEND', err);
      alert('update gagal, coba lagi nanti');
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "column", alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ marginRight: 10 }}>Name:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 5 }}
          value={updateProfile.name}
          onChangeText={(value) => handleOnChange('name', value)}
        />
        <Text style={{ marginRight: 10 }}>Mobile:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 5 }}
          value={updateProfile.mobile}
          onChangeText={(value) => handleOnChange('mobile', value)}
        />
      </View>

      {/* Similar style adjustment can be applied to other input fields */}
      
      <TouchableOpacity
        onPress={handleOnSubmit}
        style={{
          backgroundColor: '#4E4FEB',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 26,
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white' }}>submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UpdateProfile;
