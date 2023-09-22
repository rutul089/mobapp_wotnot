import React from 'react';
import {StyleSheet, View} from 'react-native';

import RadioButton from './RadioButton';
import {RadioGroupProps} from './types';

export default function RadioGroup({
  containerStyle,
  layout = 'column',
  onPress,
  radioButtons,
  selectedId,
  testID,
  radioBtnColor,
  size,
  disabled,
}: RadioGroupProps) {
  function handlePress(id: string) {
    if (id !== selectedId && onPress) {
      onPress(id);
    }
  }

  return (
    <View
      style={[styles.container, {flexDirection: layout}, containerStyle]}
      testID={testID}>
      {radioButtons?.map((button,index) => (
        <RadioButton
          {...button}
          key={button.id}
          selected={button.id === selectedId}
          onPress={() => (disabled ? null : handlePress(index))}
          color={radioBtnColor}
          size={size}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
