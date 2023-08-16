import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Text from '../Text';
import theme from '../../util/theme';
import images from '../../assets/images';
import Spacing from '../Spacing';

const Chip = ({value, onPress, chipStyle}) => (
  <View style={[styles.container, chipStyle]}>
    <View style={styles.chipContainer}>
      <Text type={'body2'} style={[{paddingHorizontal: 5}]}>
        {value}
      </Text>
      <Spacing direction="x" size="5" />
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        <Image
          source={images.ic_cross}
          style={styles.chipCloseBtn}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default Chip;

const styles = StyleSheet.create({
  container: {
    height: theme.sizes.x28,
    backgroundColor: theme.colors.F0F0F0,
    paddingHorizontal: 5,
    borderRadius: 3,
    justifyContent: 'center',
    marginRight:8,
    marginBottom:8
  },
  chipCloseBtn: {
    height: theme.sizes.icons.xs2 - 2,
    width: theme.sizes.icons.xs2 - 2,
    alignSelf: 'center',
    bottom: -1,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
