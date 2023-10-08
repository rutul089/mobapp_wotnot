//  Lib
import React, {useMemo} from 'react';
import {Image, TouchableHighlight, StyleSheet, View} from 'react-native';
import {Spacing, Text} from '../../../../../components';
import ChatMsgInfo from '../ChatMsgInfo';
import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';
import images from '../../../../../assets/images';
import {
  DEFAULT_IMG,
  VALIDATION_REGEX as REGEX_PATTERNS,
} from '../../../../../util/helper';
import theme from '../../../../../util/theme';
import moment from 'moment';

function ChatAppointmentBooking(props) {
  const {chatItem, slides, onToggleImageModal, pos} = props;
  const getShortForm = value => {
    return value?.toLowerCase() === 'minutes'
      ? 'min'
      : value?.toLowerCase() === 'hours'
      ? 'hr'
      : value;
  };
  let chatData = chatItem?.agent?.message?.payload;

  const renderDuration = value => {
    return (
      <View style={styles.durationContainer}>
        <Text type={'caption12'} color={theme.colors.cool_blue}>
          {`${value?.value} ${getShortForm(value?.label)}`}
        </Text>
      </View>
    );
  };

  const renderAvatar = value => {
    console.log('value', JSON.stringify(value));
    return (
      <View style={{alignSelf: 'center'}}>
        <Image
          defaultSource={images.ic_userprofile}
          source={value?.avatar ? {uri: value?.avatar} : images.ic_userprofile}
          style={styles.avatarStyle}
        />
      </View>
    );
  };

  const renderAppointmentDetail = (value, icon) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 3,
        }}>
        <Image
          source={icon}
          resizeMode={'contain'}
          style={styles.iconStyle}
          tintColor={theme.colors.typography.silver}
        />
        <Spacing direction="y" size="xs" />
        <Text type={'caption12'} color={theme.colors.typography.silver}>
          {value}
        </Text>
      </View>
    );
  };

  getDateValue = value => {
    let date = moment(value).format('MMMM DD,yyyy');
    return date;
  };

  return useMemo(
    () => (
      <View style={[chatBubbleStyle.bubbleWrapper]}>
        <View
          style={[
            chatBubbleStyle.bubbleContainerVisitor,
            {
              borderRadius: 10,
              borderTopRightRadius: 2,
              borderTopLeftRadius: 10,
              padding: 10,
              width: '80%',
              // justifyContent: 'center',
            },
          ]}>
          {chatData?.duration ? renderDuration(chatData?.duration) : null}
          {chatData?.assignee?.length > 0
            ? renderAvatar(chatData?.assignee?.[0])
            : null}
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              type={'body2'}
              numberOfLines={1}
              style={{
                width: '100%',
                marginVertical: theme.normalize(5),
                textAlign: 'center',
              }}>
              {chatData?.title}
            </Text>
            <View>
              {renderAppointmentDetail(
                `${getDateValue(
                  chatData?.variables?.['¿·$user.info.date_var·?']?.value,
                )} ${
                  chatData?.variables?.['¿·gcal_selected_slot_time·?']?.value
                }`,
                images.ic_calendar,
              )}
              {renderAppointmentDetail(
                chatData?.['visitor_timezone'],
                images.ic_qualification_temp,
              )}

              {renderAppointmentDetail(
                chatData?.variables?.['¿·$user.info.email·?']?.value,
                images.ic_email,
              )}
            </View>
            <Text
              type={'button2'}
              fontFamily={theme.typography.fonts.circularStdMedium}
              weight={theme.typography.fontWeights.medium}
              textAlign={'center'}
              numberOfLines={1}
              color={theme.colors.yellow}
              style={{marginVertical: theme.normalize(5)}}>
              {chatData?.is_booking_confirmed
                ? 'MEETING BOOKED'
                : chatData?.is_booking_failed
                ? 'MEETING FAILED'
                : ''}
            </Text>
          </View>
        </View>
        <ChatMsgInfo
          timeStampRight
          time={getTimeStamp(chatItem.agent.timestamp).timestamp}
          userData={chatItem}
        />
      </View>
    ),
    [chatItem, pos],
  );
}
const styles = StyleSheet.create({
  durationContainer: {
    backgroundColor: '#d5e3f8',
    padding: theme.normalize(5),
    borderRadius: theme.normalize(5),
    alignSelf: 'flex-end',
  },
  avatarStyle: {
    height: theme.sizes.image.xl4,
    width: theme.sizes.image.xl4,
    borderRadius: theme.sizes.image.xl4 / 2,
  },
  iconStyle: {
    height: theme.sizes.image.xs2,
    width: theme.sizes.image.xs2,
  },
});

export default ChatAppointmentBooking;
