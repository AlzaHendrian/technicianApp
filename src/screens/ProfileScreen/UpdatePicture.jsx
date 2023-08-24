import React, {useState} from 'react';
import {View,Text, Image, TouchableOpacity} from 'react-native';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const UpdatePicture = ({route}) => {
  const {pic} = route.params;
  const [photo, setPhoto] = useState(null);

  console.log("INI PICTURE :", pic);
  const handleImageSelect = () => {
    const options = {
      title: 'Select Profile Picture',
      mediaType: 'photo',
     
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.uri);
        // RNFetchBlob.fs
        //   .readFile(response.uri, 'base64')
        //   .then(data => {
        //     // Update the profile picture state with the base64 data
        //     setPhoto(`data:image/jpeg;base64,${data}`);
        //   })
        //   .catch(error => {
        //     console.log('Error converting image to base64:', error);
        //   });
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      {photo ? (
        <Image
          source={{uri: photo}}
          style={{width: 150, height: 150, borderRadius: 75}}
        />
      ) : (
        <>
          <View style={{ alignItems: 'center'}}>
            <Image 
              source={{uri: pic}}
              style={{width: 200, height: 200, borderRadius: 100, marginTop: 20 }}
              />
            <TouchableOpacity style={{
              // textAlign: 'center',
              marginTop: 14,
              backgroundColor: 'blue',
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 50,
              width: '90%',
              alignItems: 'center'
            }}
            
            onPress={handleImageSelect}>
              <Text style={{color: 'white', fontSize: 14}}>
                ubah foto
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default UpdatePicture;
