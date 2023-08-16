import React from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Header, FlexContainer, Text, Spacing} from '../../../components/';
import theme from '../../../util/theme';
import styles from '../Style';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {strings} from '../../../locales/i18n';
import images from '../../../assets/images';

const renderQualificationRow = (icon, label, value) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.labelStyle}>
        <Image source={icon} resizeMode={'contain'} style={styles.iconStyle} />
        <Spacing direction="y" size="xs" />
        <Text type={'body2'} color={theme.colors.typography.silver}>
          {label}
        </Text>
      </View>
      <View style={styles.valueStyle}>
        <Text type={'body2'} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const UserDetailComponent = ({onPressLeftContent, data,addLabelPress}) => {
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isRightIconHidden={true}
        onPressLeftContent={onPressLeftContent}
      />
      <KeyboardAvoidingScrollView contentContainerStyle={styles.container}>
        <Text type={'h4'}>{strings('chat.user_info.qualification')}</Text>
        <Spacing />
        {renderQualificationRow(
          images.ic_name,
          strings('chat.user_info.name'),
          data?.name,
        )}
        <Spacing />
        {renderQualificationRow(
          images.ic_email,
          strings('chat.user_info.email'),
          data?.email,
        )}
        <Spacing />
        {renderQualificationRow(
          images.ic_phone,
          strings('chat.user_info.phone'),
          data?.phone,
        )}
        <Spacing />
        {renderQualificationRow(
          images.ic_url,
          strings('chat.user_info.url'),
          data?.url,
        )}
        <Spacing />
        {renderQualificationRow(
          images.ic_city,
          strings('chat.user_info.city'),
          data?.city,
        )}
        <Spacing />
        {renderQualificationRow(
          images.ic_zip_code,
          strings('chat.user_info.zip_code'),
          data?.zipcode,
        )}
        <Spacing />
        {renderQualificationRow(
          images.ic_country,
          strings('chat.user_info.country_code'),
          data?.countrycode,
        )}
        <Spacing size="md" />
        <View
          style={{
            height: theme.normalize(1),
            backgroundColor: theme.colors.borderColor,
          }}
        />
        <Spacing size="xl" />
        <Text type={'h4'}>{strings('chat.user_info.system_details')}</Text>
        <Spacing size="xs10" />
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.colors.borderColor,
            padding: theme.sizes.spacing.xs10,
            borderRadius: 5,
          }}></View>
        <Spacing size="xs10" />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnStyle}
          onPress={addLabelPress}>
          <Text type={'button2'} color={'white'}>
            {strings('button.add_labels')}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingScrollView>
    </FlexContainer>
  );
};

export default UserDetailComponent;
