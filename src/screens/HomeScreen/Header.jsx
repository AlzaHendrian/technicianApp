import React,{useRef, useEffect} from 'react';
import {Text, Image, View, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UseAppContext } from '../../context';

const Header = () => {
  const { state } = UseAppContext();
  const { user: userData } = state.authentication;
  const slideAnimation = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 400, // Adjust the duration as needed
      useNativeDriver: false, // UseNativeDriver is set to false for layout animations
    }).start();
  }, []);
  const imageHeaderSource = `data:image/png;base64,${userData.image_1920}`;



  return (
    <Animated.View
      style={[{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },{
        transform: [{ translateY: slideAnimation }],
      }]}>
      <LinearGradient
        colors={['blue', '#78C1F3']}
        style={{
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          height: 180,
        }}
        start={{x: 3, y: 3}}
        end={{x: 0, y: 1}}>
        <View
          style={{
            paddingHorizontal: 40,
            paddingVertical: 60,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Icon name="user-circle" size={60} color='white' /> */}
          <Image source={{ uri: imageHeaderSource }} style={styles.image} />
          
          <View style={{marginStart: 20}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: 'white',
              }}>
              Welcome to,
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '600',
                color: 'white',
              }}>
              Technician Apps
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // image: {
  //   width: 60,
  //   height: 60,
  //   color: 'white',
  // },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100, // Make the image circular
    marginBottom: 20,
  },
});

export default Header;
