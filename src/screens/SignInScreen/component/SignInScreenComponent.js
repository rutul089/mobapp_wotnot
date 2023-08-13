import React from 'react';
import {View} from 'react-native';
import {Button, FlexContainer, Text} from '../../../components';
import theme from '../../../util/theme';

const SignInScreenComponent = ({params}) => (
  <FlexContainer>
    <View style={{padding: 20}}>
      <Text type={'caption12'}>Bot, Ahmedabad, India</Text>
      <Text type={'body1'}>Sign in and build come cool bots</Text>
      <Text type={'caption12'}>Bot, Ahmedabad, India</Text>
      <View style={{marginTop: 25}} />
      <Button bg={theme.colors.brandColor.blue} buttonText={'Open Inbox'} />
    </View>
  </FlexContainer>
);

export default SignInScreenComponent;
