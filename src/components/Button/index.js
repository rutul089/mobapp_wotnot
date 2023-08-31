import {Button as IButton} from 'native-base';
import React from 'react';
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
  _textStyle,
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
    variant={variant}
    _text={{
      color: theme.colors.white,
      fontWeight: theme.typography.fontWeights.medium,
      fontFamily: theme.typography.fonts.circularStdMedium,
      ..._textStyle,
    }}
    {...rest}>
    {buttonText}
  </IButton>
);

export default Button;
