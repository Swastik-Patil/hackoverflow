import React from 'react';
import { View, Text, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../assets/social/logo.png')} />
    </View>
  );
};

export default SplashScreen;