import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Header,
  FlexContainer,
  Text,
  Spacing,
  Chip,
  BottomSheet,
  ActionItem,
  Loader,
} from '../../../components/';
import theme from '../../../util/theme';
import styles from '../Style';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {strings} from '../../../locales/i18n';
import images from '../../../assets/images';
import {Actionsheet, useDisclose} from 'native-base';

const renderQualificationRow = (icon, label, value, is_hidden) => {
  if (is_hidden) {
    return null;
  }
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.labelStyle}>
          <Image
            source={icon}
            resizeMode={'contain'}
            style={styles.iconStyle}
          />
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
      <Spacing />
    </>
  );
};

const UserDetailComponent = ({
  onPressLeftContent,
  data,
  addLabelPress,
  chipList,
  removeLabel,
  showLabelModal,
  onCloseModal,
  allLabelModalRef,
  onLabelPress = () => {},
  labelData,
  qualifications,
  isRefreshing,
  onRefresh,
  isLoading,
}) => {
  const {isOpen, onOpen} = useDisclose();
  console.log('qualifications', JSON.stringify(qualifications));
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isRightIconHidden={true}
        onPressLeftContent={onPressLeftContent}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <Text type={'h4'}>{strings('chat.user_info.qualification')}</Text>
        <Spacing />
        {qualifications &&
          qualifications.map((item, index) => {
            switch (item?.key) {
              case '¿·$user.info.name·?':
                return renderQualificationRow(
                  images.ic_name,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case '¿·$user.info.email·?':
                return renderQualificationRow(
                  images.ic_email,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case '¿·$user.info.phone·?':
                return renderQualificationRow(
                  images.ic_phone,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'source_url':
                return renderQualificationRow(
                  images.ic_url,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'state_name':
                return renderQualificationRow(
                  images.ic_country,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'city_name':
                return renderQualificationRow(
                  images.ic_city,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'zip_code':
                return renderQualificationRow(
                  images.ic_zip_code,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'country_code':
                return renderQualificationRow(
                  images.ic_country,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              default:
                return renderQualificationRow(
                  images.ic_qualification_temp,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
            }
          })}
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
        <View style={styles.labelContainer}>
          {chipList.map((item, index) => (
            <Chip
              key={index}
              value={item?.name}
              onPress={() => removeLabel(item, index)}
            />
          ))}
        </View>
        <Spacing size="xs10" />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnStyle}
          onPress={addLabelPress}>
          <Text type={'button2'} color={'white'}>
            {strings('button.add_labels')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomSheet
        ref={allLabelModalRef}
        height={
          labelData?.length > 0 ? theme.normalize(220) : theme.normalize(120)
        }
        closeOnDragDown
        customStyles={{
          mask: {backgroundColor: 'transparent'},
          container: {
            elevation: 100,
          },
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
          {labelData && labelData?.length > 0 ? (
            labelData.map((item, index) => (
              <ActionItem
                key={index}
                label={item?.name}
                onItemPress={() => onLabelPress(item, index)}
              />
            ))
          ) : (
            <View style={{marginVertical: theme.normalize(15)}}>
              <Text type={'error'} textAlign={'center'}>
                No label found
              </Text>
            </View>
          )}
        </ScrollView>
      </BottomSheet>
      {isLoading ? <Loader loading={isLoading} /> : null}
    </FlexContainer>
  );
};

export default UserDetailComponent;
