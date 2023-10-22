import React from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Linking,
  SafeAreaView,
  Modal,
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
import {strings} from '../../../locales/i18n';
import images from '../../../assets/images';
import {isValidEmail} from '../../../util/ChatHistoryHelper';

const renderQualificationRow = (icon, label, value, is_hidden, isLink) => {
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
            tintColor={theme.colors.typography.silver}
          />
          <Spacing direction="y" size="xs" />
          <Text type={'body2'} color={theme.colors.typography.silver}>
            {label}
          </Text>
        </View>
        <Spacing direction="x" />
        <View style={styles.valueStyle}>
          {isLink ? (
            <Text
              onPress={() =>
                isValidEmail(value)
                  ? Linking.openURL(`mailto:${value}`)
                  : Linking.openURL(value)
              }
              type={'body2'}
              color={theme.colors.typography.link}
              style={
                {
                  // borderBottomWidth: 0.5,
                  // borderBottomColor: theme.colors.typography.link
                }
              }>
              {value}
            </Text>
          ) : (
            <Text type={'body2'}>{value}</Text>
          )}
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
  const [isScroll, setIsScroll] = React.useState(true);

  const renderLabelView = () => {
    return (
      <Modal
        animationType="slide"
        visible={showSavedReply}
        style={{backgroundColor: 'black'}}
        statusBarTranslucent={false}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.colors.brandColor.FAFAFA,
          }}>
          <View style={{overflow: 'hidden', paddingBottom: 1}}>
            <View style={styles.assigneeHeader}>
              <TouchableOpacity activeOpacity={0.5} onPress={onCloseSaveReply}>
                <Image
                  source={images.ic_cross}
                  resizeMode="contain"
                  style={styles.assigneeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isRightIconHidden={true}
        onPressLeftContent={onPressLeftContent}
      />
      <ScrollView
        disableScrollViewPanResponder={false}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <Text type={'h4'}>{strings('chat.user_info.CONTACT_LIST_TITLE')}</Text>
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
                  true,
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
                  true,
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
              case 'bot_name':
                return renderQualificationRow(
                  images.ic_bot_icon,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'global_channel_name':
                return renderQualificationRow(
                  images.ic_channel,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'ip_address':
                return renderQualificationRow(
                  images.ic_ip_address,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'timezone':
                return renderQualificationRow(
                  images.ic_timezone,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'browser':
                return renderQualificationRow(
                  images.ic_browser,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'browser_language':
                return renderQualificationRow(
                  images.ic_browser_language,
                  item?.label,
                  item?.value,
                  item?.is_hidden,
                );
              case 'os':
                return renderQualificationRow(
                  images.ic_os,
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
        <Text type={'h4'}>{strings('chat.user_info.LABELS')}</Text>
        <Spacing size="xs10" />
        <View style={styles.labelContainer}>
          <ScrollView
            key={1}
            nestedScrollEnabled
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              flexGrow: 1,
              padding: theme.sizes.spacing.xs10,
            }}>
            {chipList.map((item, index) => (
              <Chip
                key={index}
                value={item?.name}
                onPress={() => removeLabel(item, index)}
              />
            ))}
          </ScrollView>
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
          labelData?.length > 0
            ? labelData?.length > 6
              ? theme.normalize(500)
              : theme.normalize(220)
            : theme.normalize(120)
        }
        closeOnDragDown
        customStyles={{
          mask: {backgroundColor: 'transparent'},
          container: {
            elevation: 100,
          },
        }}>
        <ScrollView
          key={123}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
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
