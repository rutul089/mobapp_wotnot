import {Actionsheet} from 'native-base';
import React from 'react';
import {hp} from '../../util/helper';
import theme from '../../util/theme';

const ActionItem = ({label, onItemPress, leftIcon}) => (
  <Actionsheet.Item
    style={{justifyContent: 'center', paddingTop: 10}}
    _text={{
      fontFamily: theme.typography.fonts.circularStdBook,
      fontSize: theme.typography.fontSizes.md,
      color: theme.colors.typography.dark,
      marginTop: hp(-0.2),
    }}
    background={'white'}
    _pressed={{
      background: '#f2f2f2',
    }}
    onPress={onItemPress}
    leftIcon={leftIcon}>
    {label}
  </Actionsheet.Item>
);

export default ActionItem;
