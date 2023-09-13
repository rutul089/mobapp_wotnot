import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import images from '../../../assets/images';
import styles from '../Style';
import {
  Button,
  FlexContainer,
  Input,
  Loader,
  Spacing,
  Text,
  Header,
} from '../../../components';
import {SVG} from '../../../assets/svg';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';

const TwoFactorCheckComponent = ({
  onPressLeftContent,
  onSubmit,
  state,
  onVerifyCodeChange,
  onSubmitVerifyCode,
  recoveryCodeBtnPress,
  tittle,
  tittle2,
  inputLabel,
  btnLabel,
  showRecoveryLabel,
  isLoading,
  maxLength=6,
  placeholder
}) => (
  <FlexContainer>
    <Header
      backgroundColor={'white'}
      isRightIconHidden
      isCenterDisabled
      onPressLeftContent={onPressLeftContent}
    />
    <KeyboardAvoidingScrollView
      style={{flex: 1}}
      contentContainerStyle={styles.mainContainer}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <SVG.LoginLogoIcon />
        <Spacing size="xl" />
        <Text type={'h3'}>{tittle}</Text>
        <Spacing size="xs" />
        <Text type={'body1'} textAlign={'center'}>
          {tittle2}
        </Text>
        <Spacing size="xl2" />
      </View>
      <Input
        label={inputLabel}
        placeholder={placeholder}
        isError={!state?.isErrOTP}
        errorMsg={state?.errOTP}
        value={state?.verifyCode}
        keyboardType={'number-pad'}
        onChangeText={onVerifyCodeChange && onVerifyCodeChange}
        returnKeyType="done"
        onSubmitEditing={onSubmitVerifyCode && onSubmitVerifyCode}
        maxLength={maxLength}
      />
      <Spacing size="xl" />
      <Button
        bg={theme.colors.brandColor.blue}
        buttonText={btnLabel}
        onPress={onSubmit}
      />
      <Spacing size="md" />
      {showRecoveryLabel ? (
        <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          activeOpacity={0.5}
          onPress={recoveryCodeBtnPress}>
          <Text type={'link'}>{strings('button.enter_recovery_code')}</Text>
        </TouchableOpacity>
      ) : null}
    </KeyboardAvoidingScrollView>
    <Loader loading={isLoading} />
  </FlexContainer>
);

export default TwoFactorCheckComponent;
