import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import images from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {
  Button,
  FlexContainer,
  Input,
  Loader,
  Spacing,
  Text,
} from '../../../components';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import styles from '../Style';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const SignInScreenComponent = (
  {
    onSubmit,
    onEmailChange,
    onPwdChange,
    state,
    emailInputRef,
    passWordInputRef,
    onSubmitEditingEmail,
    onSubmitEditingPwd,
    rightIconClick,
    scrollViewRef,
    isLoading,
    onForgotPwdClick,
    _googleSignIn,
  },
  ref,
) => {
  return (
    <FlexContainer>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={scrollViewRef?.current?.scrollToEnd({
          animated: true,
        })}>
        <KeyboardAvoidingScrollView
          // ref={scrollViewRef}
          // onKeyboardDidShow={e =>
          //   scrollViewRef?.current?.scrollToEnd({animated: true})
          // }
          style={{flex: 1}}>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <SVG.LoginLogoIcon />
              <Text type={'h3'} style={styles.welcome_message_1}>
                {strings('login.WELCOME_BACK_MSG')}
              </Text>
              <Text type={'body1'} style={styles.welcome_message_2}>
                {strings('login.SIGN_IN_WELCOME_SUB_TEXT')}
              </Text>
            </View>
            {/* <Button
              style={styles.sign_in_with_google}
              buttonText={'Sign-In with google'}
            /> */}
            {/* <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn}
            /> */}
            <Spacing size="xl" />
            <TouchableOpacity
              onPress={_googleSignIn}
              activeOpacity={0.7}
              style={styles.googleButtonStyle}>
              <Image
                source={images.ic_google}
                style={styles.googleIcon}
                resizeMode={'contain'}
              />
              <Text textAlign={'center'} style={{flex: 1}}>
                {strings('button.GOOGLE_SIGN_IN_TEXT')}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.input_container_main}>
              <View style={styles.input_container}>
                <Input
                  id="email"
                  label={strings('login.EMAIL_LABEL')}
                  placeholder={'abc@abc.com'}
                  isError={!state?.isErrEmail}
                  errorMsg={state.emailErrMsg}
                  value={state?.email}
                  keyboardType={'email-address'}
                  onChangeText={onEmailChange && onEmailChange}
                  inputRef={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={onSubmitEditingEmail && onSubmitEditingEmail}
                />
                <Spacing />
                <Input
                  label={strings('login.PASSWORD_LABEL')}
                  placeholder={'Password'}
                  isError={!state?.isErrPwd}
                  errorMsg={state?.pwdErrMsg}
                  value={state?.password}
                  secureTextEntry={!state?.isPwdVisible}
                  onChangeText={text => {
                    onPwdChange(text);
                    scrollViewRef?.current?.scrollToEnd({animated: true});
                  }}
                  inputRef={passWordInputRef}
                  returnKeyType="done"
                  onSubmitEditing={onSubmitEditingPwd && onSubmitEditingPwd}
                  isRightIconElementVisible
                  rightIcon={
                    state?.isPwdVisible ? images.ic_hidePwd : images.ic_showPwd
                  }
                  rightIconClick={rightIconClick}
                  tintColor={theme.colors.brandColor.silver}
                />
              </View>
              <Button
                bg={theme.colors.brandColor.blue}
                buttonText={strings('button.EMAIL_SIGN_IN_TEXT')}
                onPress={onSubmit}
              />
              <TouchableOpacity
                onPress={onForgotPwdClick}
                activeOpacity={0.7}
                style={{
                  alignSelf: 'flex-start',
                }}>
                <Text type={'button2'} style={styles.btn_forgot_password}>
                  {strings('button.FORGOT_PASSWORD_TITLE')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingScrollView>
        <Loader loading={isLoading} />
      </ScrollView>
    </FlexContainer>
  );
};
export default forwardRef(SignInScreenComponent);
