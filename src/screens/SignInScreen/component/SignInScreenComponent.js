import {default as React} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
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

const SignInScreenComponent = ({
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
}) => {
  return (
    <FlexContainer>
      <KeyboardAvoidingScrollView
        ref={scrollViewRef}
        onKeyboardDidShow={e =>
          scrollViewRef?.current?.scrollToEnd({animated: true})
        }
        style={{flex: 1}}>
        <ScrollView>
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
                <Input
                  id="email"
                  label={strings('login.email')}
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
                  label={strings('login.password')}
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
                buttonText={strings('button.sign_in')}
                onPress={onSubmit}
              />
              <TouchableOpacity>
                <Text type={'h5'} style={styles.btn_forgot_password}>
                  {strings('button.forgot_password')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingScrollView>
      <Loader loading={isLoading} />
    </FlexContainer>
  );
};
export default SignInScreenComponent;
