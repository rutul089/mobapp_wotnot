import {Actionsheet, Pressable, Box} from 'native-base';
import React from 'react';
import {hp} from '../../util/helper';
import theme from '../../util/theme';
import Text from '../Text/index';

const ActionItem = ({
  label,
  onItemPress,
  leftIcon,
  borderBottomWidth = 1,
  borderBottomColor = theme.colors.borderColor,
  isSelected,
  rightIcon,
  textStyle,
  containerStyle,
}) => (
  <Pressable onPress={onItemPress}>
    {({isHovered, isFocused, isPressed}) => {
      return (
        <Box
          bg={isPressed ? '#f2f2f2' : 'white'}
          style={{
            minHeight: theme.sizes.xl15,
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
            paddingHorizontal: theme.normalize(8),
            paddingVertical: theme.normalize(5),
            borderBottomWidth: borderBottomWidth,
            borderBottomColor: borderBottomColor,
            ...containerStyle,
          }}
          borderColor="coolGray.300">
          {leftIcon}
          <Text type={'body1'} style={{flex: 1, paddingHorizontal: 10}}>
            {label}
          </Text>
          {rightIcon}
        </Box>
      );
    }}
  </Pressable>
  // <Actionsheet.Item
  //   style={{
  //     justifyContent: 'center',
  //     borderBottomWidth: borderBottomWidth,
  //     borderBottomColor: borderBottomColor,
  //   }}
  //   _text={{
  //     fontFamily: theme.typography.fonts.circularStdBook,
  //     fontSize: theme.typography.fontSizes.md,
  //     color: theme.colors.typography.dark,
  //     numberOfLines: 1,
  //     flex: 1,
  //     // marginTop: hp(-0.2),
  //   }}
  //   background={'white'}
  //   _pressed={{
  //     background: '#f2f2f2',
  //   }}
  //   _stack={{flex: 0}}
  //   onPress={onItemPress}
  //   rightIcon={rightIcon}
  //   leftIcon={leftIcon}>
  //   {label}
  // </Actionsheet.Item>
);

export default ActionItem;
