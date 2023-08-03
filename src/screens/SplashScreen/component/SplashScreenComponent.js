import React from 'react';
import {Text, View, Image, SafeAreaView} from 'react-native';
import images from '../../../assets/images';
import styles from '../Style';

const SplashScreenComponent = ({params}) => (
  <View style={styles.mainContainer}>
    <Image
      source={images.ic_wotnot_logo}
      style={styles.logoStyle}
      resizeMode={'contain'}
    />
  </View>
);

export default SplashScreenComponent;
