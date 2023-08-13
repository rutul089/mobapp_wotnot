import {Input} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SVG} from '../../../assets/svg';
import {Button, FlexContainer, Text} from '../../../components';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import styles from '../Style';

const SignInScreenComponent = ({onSubmit}) => {
  const [state, setState] = useState({email: '', password: ''});

  const handleInputFill = (email = '', password = '') => {
    setState(prev => ({...prev, email, password}));
  };

  return (
    <FlexContainer>
      <View style={styles.container}>
        <SVG.LoginLogoIcon />
        <Text type={'h3'} style={styles.welcome_message_1}>
          {strings('login.welcome_message_1')}
        </Text>
        <Text type={'body1'} style={styles.welcome_message_2}>
          {strings('login.welcome_message_2')}
        </Text>
        <Button
          style={styles.sign_in_with_google}
          buttonText={'Sign-In with google'}
        />
        <View style={styles.divider} />
        <View style={styles.input_container_main}>
          <View style={styles.input_container}>
            <Text>{strings('login.email')}</Text>
            <Input
              id="email"
              value={state.email}
              style={styles.input}
              onChangeText={text => handleInputFill(text, state.password)}
            />
          </View>
          <View style={styles.input_container}>
            <Text>{strings('login.password')}</Text>
            <Input
              id="password"
              value={state.password}
              style={styles.input}
              type="password"
              onChangeText={text => handleInputFill(state.email, text)}
            />
          </View>
          <Button
            bg={theme.colors.brandColor.blue}
            buttonText={strings('button.sign_in')}
            onPress={() => onSubmit(state.email, state.password)}
          />
          <TouchableOpacity>
            <Text type={'h5'} style={styles.btn_forgot_password}>
              {strings('button.forgot_password')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </FlexContainer>
  );
};
export default SignInScreenComponent;
