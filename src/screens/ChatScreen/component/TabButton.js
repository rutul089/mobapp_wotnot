import React from 'react';
import {Text, View, Pressable} from 'react-native';

const TabButton = ({onPress}) => (
  <Pressable onPress={onPress}>
    <Text>componentName</Text>
  </Pressable>
);

export default TabButton;
