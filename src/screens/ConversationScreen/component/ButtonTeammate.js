import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../../../components';
import theme from '../../../util/theme';

const ButtonTeammate = ({tittle, isSelected, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{
      backgroundColor: theme.colors.brandColor.FAFAFA,
      height: theme.sizes.spacing.xl11,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      borderBottomColor: theme.colors.brandColor.blue,
      borderBottomWidth: isSelected ? theme.normalize(1.5) : 0,
    }}>
    <Text
      type={'body2'}
      color={
        isSelected
          ? theme.colors.brandColor.blue
          : theme.colors.typography.black
      }>
      {tittle}
    </Text>
  </TouchableOpacity>
);

export default ButtonTeammate;
