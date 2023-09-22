import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../Text';
import theme from '../../util/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckBox = ({
  title,
  onPress,
  style,
  disabled,
  isChecked,
  color = theme.colors.brandColor.blue,
  childLayout
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.check, style]}
    onPress={onPress}
    activeOpacity={1}>
    <Icon
      name={isChecked ? 'check-box' : 'check-box-outline-blank'}
      size={theme.sizes.icons.xl}
      color={
        disabled ? 'rgba(0,0,0,0.4)' : isChecked ? color : 'rgba(0,0,0,0.4)'
      }
    />
    {title ? (
      <View style={{paddingLeft: 10}}>
        <Text
          color={!disabled ? theme.colors.typography.black : 'rgba(0,0,0,0.4)'}>
          {title}
        </Text>
        {childLayout}
      </View>
    ) : null}
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  check: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.normalize(6),
    alignContent: 'center',
  },
});
export default CheckBox;
