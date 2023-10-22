import React from 'react';
import {Text} from '../components';

export const applyStyleToText = (
  data,
  placeholderStyle,
  starttag,
  endtag,
  isShift,
  type,
  numberOfLines,
) => {
  let higherUsage = data;
  let convertedtext = '';

  while (higherUsage != '') {
    if (higherUsage.indexOf(starttag) >= 0) {
      let text = higherUsage.split(starttag)[0];
      let placeeholder = higherUsage.split(starttag)[1].split(endtag)[0];
      let remaining = higherUsage.split(endtag);
      remaining.shift();
      higherUsage = remaining.join(endtag);
      if (placeholderStyle.length > 0) {
        if (placeholderStyle[0].onPress) {
          convertedtext = (
            <Text type={type} numberOfLines={numberOfLines}>
              {convertedtext}
              {text}
              <Text
                type={type}
                numberOfLines={numberOfLines}
                style={placeholderStyle[0].style}
                onPress={placeholderStyle[0].onPress}>
                {placeeholder}
              </Text>
            </Text>
          );
        } else {
          convertedtext = (
            <Text type={type} numberOfLines={numberOfLines}>
              {convertedtext}
              {text}
              <Text
                type={type}
                style={placeholderStyle[0].style}
                numberOfLines={numberOfLines}>
                {placeeholder}
              </Text>
            </Text>
          );
        }
      }
      {
        isShift && placeholderStyle.shift();
      }
    } else {
      convertedtext = (
        <Text type={type} numberOfLines={numberOfLines}>
          {convertedtext}
          {higherUsage}
        </Text>
      );
      higherUsage = '';
    }
  }
  return convertedtext;
};
