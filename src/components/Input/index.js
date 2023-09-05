import {Box, Input as IInput} from 'native-base';
import React from 'react';

import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../util/theme';
import {
  computeColor,
  computeFontFamily,
  computeFontSize,
  computeFontWeight,
} from '../helpers/helper';
import {Text as IText} from '../index';

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  errorMsg: {
    // fontWeight: theme.typography.fontWeights.medium,
    // fontFamily: theme.typography.fonts.circularStdMedium,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});

const Input = ({
  value,
  label = '',
  color,
  size,
  weight,
  fontFamily,
  children,
  type,
  style,
  errorMsg,
  errorMsgStyles,
  isError,
  placeholder,
  labelStyles,
  lineHeight,
  errorTextColor = theme.colors.typography.error,
  focusOutlineColor = theme.colors.brandColor.silver,
  borderColor = theme.colors.brandColor.silver,
  backgroundColor = theme.colors.white,
  placeholderTextColor = theme.colors.typography.placeHolder,
  labelTextColor = theme.colors.typography.dark,
  isDisable,
  showRightElement,
  rightIcon,
  rightIconClick,
  isRightIconElementVisible,
  secureTextEntry,
  onChangeText,
  returnKeyType,
  onSubmitEditing,
  inputRef,
  tintColor,
  containerStyle,
  isLeftIconElementVisible,
  leftIconClick,
  computedLeftIcon,
  leftIconStyle,
  rightIconStyle,
  leftIconDisabled,
  ...rest
}) => {
  const isValidJSX = React.isValidElement(children);
  const computedFontSize = computeFontSize(size);
  const computedFontFamily = computeFontFamily(fontFamily);
  const computedFontWeight = computeFontWeight(weight);
  const computedFontColor = computeColor(color);
  const computedFocusOutlineColor = computeColor(focusOutlineColor);
  const computedBorderColor = computeColor(borderColor);
  const computedRightIcon = rightIcon;

  const defaultTextStyle = {
    fontFamily: computedFontFamily ?? theme.typography.fonts.circularStdBook,
    fontSize: computedFontSize ?? theme.typography.fontSizes.md,
    color: computedFontColor ?? theme.colors.typography.dark,
    fontWeight: computedFontWeight ?? undefined,
    backgroundColor: computeColor(backgroundColor),
    height: theme.sizes.xl13,
  };

  const disableTextStyle = {
    backgroundColor: '#F1F1F1',
  };

  return (
    <>
      <Box style={containerStyle}>
        {label?.length > 0 && (
          <IText
            style={[
              styles.label,
              {color: computeColor(labelTextColor)},
              labelStyles,
            ]}>
            {label}
          </IText>
        )}

        <IInput
          value={value}
          placeholder={placeholder}
          focusOutlineColor={computedFocusOutlineColor}
          focusable={true}
          style={[defaultTextStyle, isDisable && disableTextStyle]}
          borderColor={computedBorderColor}
          placeholderTextColor={computeColor(placeholderTextColor)}
          onChangeText={onChangeText}
          _disabled={{
            opacity: 1,
          }}
          _focus={{
            backgroundColor: 'white',
          }}
          isDisabled={isDisable}
          secureTextEntry={secureTextEntry}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          InputRightElement={
            isRightIconElementVisible && (
              <TouchableOpacity
                onPress={rightIconClick}
                style={{
                  // width: 40,
                  marginRight: theme.sizes.spacing.xs,
                }}>
                <Image
                  source={computedRightIcon}
                  style={[
                    {
                      height: theme.sizes.icons.xl2,
                      width: theme.sizes.icons.xl2,
                    },
                    {tintColor: tintColor},
                    rightIconStyle,
                  ]}
                />
              </TouchableOpacity>
            )
          }
          InputLeftElement={
            isLeftIconElementVisible && (
              <TouchableOpacity
                onPress={leftIconClick}
                disabled={leftIconDisabled}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: theme.sizes.spacing.xs,
                }}>
                <Image
                  source={computedLeftIcon}
                  style={[
                    {
                      height: theme.sizes.icons.md,
                      width: theme.sizes.icons.md,
                    },
                    {tintColor: tintColor},
                    leftIconStyle,
                  ]}
                />
              </TouchableOpacity>
            )
          }
          ref={inputRef}
          cursorColor={'blue'}
          {...rest}
        />

        {isError && errorMsg?.length > 0 && (
          <IText
            type={'error'}
            style={[
              styles.errorMsg,
              {color: computeColor(errorTextColor)},
              errorMsgStyles,
            ]}>
            {errorMsg}
          </IText>
        )}
      </Box>
    </>
  );
};

export default Input;
