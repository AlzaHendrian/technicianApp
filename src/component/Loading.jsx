import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingAnimation = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });


  export default LoadingAnimation;