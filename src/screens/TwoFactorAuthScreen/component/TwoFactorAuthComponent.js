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
  BottomSheet,
  ActionItem,
} from '../../../components';
import {SVG} from '../../../assets/svg';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import QRCode from 'react-native-qrcode-svg';

const TwoFactorAuthComponent = ({
  onPressLeftContent,
  onSubmit,
  state,
  onVerifyCodeChange,
  onSubmitVerifyCode,
  qr_code,
  isLoading,
  moreInfoModalRef,
}) => {
  return (
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
          <Text type={'h3'}>{strings('login.twoFacAuthHeader')}</Text>
          <Spacing size="xs" />
          <Text type={'body1'} textAlign={'center'}>
            {strings('login.twoFacAuthHeaderNote')}
          </Text>
          <Spacing size="xl2" />
          {qr_code ? (
            <QRCode value={qr_code} size={theme.normalize(185)} />
          ) : null}

          <Spacing size="xl2" />
        </View>
        <Input
          label={strings('login.enter_the_code')}
          placeholder={''}
          isError={!state?.isErrOTP}
          errorMsg={state?.errOTP}
          value={state?.verifyCode}
          keyboardType={'number-pad'}
          onChangeText={onVerifyCodeChange && onVerifyCodeChange}
          returnKeyType="done"
          onSubmitEditing={onSubmitVerifyCode && onSubmitVerifyCode}
          maxLength={6}
        />
        <Spacing size="xl" />
        <Button
          bg={theme.colors.brandColor.blue}
          buttonText={strings('button.verify_code')}
          onPress={onSubmit}
        />
      </KeyboardAvoidingScrollView>
      <Loader loading={isLoading} />
    </FlexContainer>
  );
};

export default TwoFactorAuthComponent;
