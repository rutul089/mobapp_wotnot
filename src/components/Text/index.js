import React from 'react';
import {Text as IText} from 'react-native';
import {theme} from '../../util/theme';
import {
  computeColor,
  computeFontFamily,
  computeFontLineHeight,
  computeFontSize,
  computeFontWeight,
} from '../helpers/helper';
import {styles} from './style';

const getTextComputedStyles = type => {
  if (type === 'h1') {
    return styles.h1;
  } else if (type === 'h2') {
    return styles.h2;
  } else if (type === 'h3') {
    return styles.h3;
  } else if (type === 'h4') {
    return styles.h4;
  } else if (type === 'h5') {
    return styles.h5;
  } else if (type === 'subtitle1') {
    return styles.subtitle1;
  } else if (type === 'subtitle2') {
    return styles.subtitle2;
  } else if (type === 'body1') {
    return styles.body1;
  } else if (type === 'body2') {
    return styles.body2;
  } else if (type === 'body3') {
    return styles.body3;
  } else if (type === 'button1') {
    return styles.button1;
  } else if (type === 'button2') {
    return styles.button2;
  } else if (type === 'caption12') {
    return styles.caption12;
  } else if (type === 'link') {
    return styles.link;
  } else if (type === 'body3-10') {
    return styles.body3_10;
  } else {
    return styles.body1;
  }
};

const getAdditionalComputedStyles = (size, weight, color, fontFamily) => {
  let additionalStyles = {};
  if (size) {
    additionalStyles = {...additionalStyles, fontSize: size};
  }
  if (weight) {
    additionalStyles = {...additionalStyles, fontWeight: weight};
  }
  if (color) {
    additionalStyles = {...additionalStyles, color};
  }
  if (fontFamily) {
    additionalStyles = {...additionalStyles, fontFamily: fontFamily};
  }
  return additionalStyles;
};

const Text = ({
  color,
  size,
  weight,
  fontFamily,
  children,
  type,
  style,
  lineHeight,
  textAlign,
  margin,
  numberOfLines,
  ...rest
}) => {
  const isValidJSX = React.isValidElement(children);
  const computedFontSize = computeFontSize(size);
  const computedFontFamily = computeFontFamily(fontFamily);
  const computedFontWeight = computeFontWeight(weight);
  const computedFontColor = computeColor(color);
  const computeLineHeight = computeFontLineHeight(lineHeight);
  const computedStyles = getTextComputedStyles(type);

  const defaultTextStyle = {
    fontFamily: computedFontFamily ?? theme.typography.fonts.circularStdBook,
    fontSize: computedFontSize ?? theme.typography.fontSizes.md,
    color: computedFontColor ?? theme.colors.typography.black,
    fontWeight: computedFontWeight ?? undefined,
    lineHeight: computeLineHeight,
    textAlign: textAlign,
    margin: margin ?? 0,
  };

  const additionalComputedStyles = getAdditionalComputedStyles(
    computedFontSize,
    computedFontWeight,
    computedFontColor,
    computedFontFamily,
  );

  return (
    <>
      {children && isValidJSX ? (
        children
      ) : children !== undefined &&
        children !== null &&
        (typeof children === 'string'
          ? children?.trim?.() !== ''
          : children !== '') ? (
        <IText
          {...rest}
          numberOfLines={numberOfLines}
          style={[
            defaultTextStyle,
            computedStyles,
            additionalComputedStyles,
            style,
          ]}>
          {children}
        </IText>
      ) : null}
    </>
  );
};

export default Text;
