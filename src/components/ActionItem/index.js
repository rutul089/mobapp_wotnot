import React from 'react';
import {Text, View} from 'react-native';
import theme from '../../util/theme';
import {Actionsheet} from 'native-base';

const ActionItem = ({label, onItemPress}) => (
  <Actionsheet.Item
    _text={{
      fontFamily: theme.typography.fonts.circularStdBook,
      fontSize: theme.typography.fontSizes.md,
    }}
    background={'white'}
    _pressed={{
      background: '#f2f2f2',
    }}
    onPress={onItemPress}>
    {label}
  </Actionsheet.Item>
);

export default ActionItem;
