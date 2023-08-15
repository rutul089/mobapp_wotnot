import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import images from '../../../assets/images';
import {FlexContainer, SwitchToggle, Text, UserItem} from '../../../components';
import Spacing from '../../../components/Spacing';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import styles from '../Style';

const RenderRowItem = ({onPress, text, dropdownVale, color, dropDownClick}) => {
  return (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={onPress}
      disabled={!onPress}>
      <Text type={'body1'} color={color}>
        {text}
      </Text>
      {dropdownVale && (
        <>
          <Spacing direction="y" size="xl" />
          <TouchableOpacity
            style={styles.rightContainer}
            activeOpacity={0.7}
            onPress={dropDownClick}>
            <Text
              type={'body2'}
              color={theme.colors.typography.silver}
              style={{flex: 1}}>
              {dropdownVale}
            </Text>
            <Image
              source={images.ic_dropdown}
              style={{height: 12, width: 12}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
};

const SettingScreenComponent = ({
  accountDropdownValue,
  languageDropdownValue,
  onNotificationClick,
  onLogoutClick,
  onPressAccountDropdown,
  onPressLanguageDropdown,
}) => {
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <View style={styles.headerStyle}>
        <Image
          source={images.ic_wotnot_logo}
          resizeMode={'contain'}
          style={styles.logoStyle}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <UserItem
          name={'Sagar Shah'}
          email={'sagar.shah@wotnot.io'}
          uri={'https://i.pravatar.cc/512'}
        />
        <Spacing size="md" />
        <View style={{flexDirection: 'row'}}>
          <Text type={'body1'} style={{flex: 1}}>
            {strings('settings.active_status')}
          </Text>
          <SwitchToggle
            switchOn={true}
            onPress={() => {}}
            circleColorOff="white"
            circleColorOn="white"
            backgroundColorOn="#13BE66"
            backgroundColorOff="#B1B8BB"
            containerStyle={{
              width: theme.sizes.xl15,
              height: theme.sizes.xl14,
              borderRadius: theme.sizes.xl5,
              padding: 5,
            }}
            circleStyle={{
              width: theme.sizes.icons.xs,
              height: theme.sizes.icons.xs,
              borderRadius: 30,
            }}
          />
        </View>
        <Text type={'body3-10'} style={{width: '60%', marginTop: 7}}>
          {strings('settings.active_status_message')}
        </Text>
        <Spacing size="md" />
        <RenderRowItem
          text={`${strings('settings.account')}  `}
          dropdownVale={accountDropdownValue}
          dropDownClick={onPressAccountDropdown}
        />
        <Spacing size="md" />
        <RenderRowItem
          text={strings('settings.language')}
          dropdownVale={languageDropdownValue}
          dropDownClick={onPressLanguageDropdown}
        />
        <Spacing size="md" />
        <RenderRowItem
          text={strings('settings.notifications')}
          onPress={onNotificationClick}
        />
        <Spacing size="md" />
        <RenderRowItem
          text={strings('settings.logout')}
          color={theme.colors.typography.error}
          onPress={onLogoutClick}
        />
      </ScrollView>
    </FlexContainer>
  );
};

export default SettingScreenComponent;
