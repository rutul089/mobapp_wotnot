import React from 'react';
import {Text, View} from 'react-native';
import {Box, Center, Stack, Button as IButton} from 'native-base';
import theme from '../../util/theme';

const Button = ({
  buttonText,
  isLoading,
  onPress,
  _loading,
  _focus,
  _pressed,
  style,
  variant,
  isDisabled,
  ...rest
}) => (
  <IButton
    disabled={isDisabled}
    isLoading={isLoading}
    onPress={onPress}
    _focus={_focus}
    _loading={{
      opacity: 1,
      ..._loading,
    }}
    _pressed={_pressed}
    style={style}
    {...rest}>
    {buttonText}
  </IButton>
);

export default Button;
