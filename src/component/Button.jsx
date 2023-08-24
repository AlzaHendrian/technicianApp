import {View, Text, TouchableNativeFeedback} from 'react-native';
import React from 'react';

const Button = ({label, onPress, textStyle, ...rest}) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#ccc')}>
      <View
        {...rest}
        style={[
          {
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          },
          rest.style,
        ]}>
        <Text
          style={[
            {
              fontWeight: 'bold',
              color: 'white',
              fontSize: 16,
            },
            textStyle,
          ]}>
          {label}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;
