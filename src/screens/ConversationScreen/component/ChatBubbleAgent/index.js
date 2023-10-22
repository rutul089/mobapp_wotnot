// Lib
import React, {useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ChatMsgInfo from '../ChatComponent/ChatMsgInfo';
import {Text} from '../../../../components';
import theme from '../../../../util/theme';
import images from '../../../../assets/images';
import {
  getUserAcronym,
  getAgentAcronym,
} from '../../../../util/ChatHistoryHelper';
import {AVATAR_COLORS} from '../../../../util/helper';
AVATAR_COLORS;
function ChatBubbleAgent(props) {
  const {
    msg,
    timeStampRight,
    chatItem,
    timestamp,
    isTimeStampHide,
    isUser,
    chatUserName,
    userFileJSX,
    renderHtml,
    onPressUser
  } = props;

  const getAcronym = (data, type = 'agent') => {
    let acronym = null;
    if (type === 'agent') {
      acronym = getAgentAcronym(data);
    } else {
      acronym = getUserAcronym(chatUserName);
    }
    return acronym;
  };

  return useMemo(
    () => (
      <>
        {isUser ? (
          <View style={styles.bubbleWrapper}>
            <View style={styles.bubbleContainer}>
              {userFileJSX ? (
                userFileJSX
              ) : (
                <Text onPress={onPressUser} type={'body2'} style={styles.textStyle} color={'white'}>
                  {msg}
                </Text>
              )}
            </View>
            {!isTimeStampHide ? (
              <ChatMsgInfo
                timeStampRight={timeStampRight}
                time={timestamp}
                userData={chatItem}
              />
            ) : null}
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            {chatItem.user.image_url ? (
              <Image
                resizeMode="contain"
                style={styles.msgAvatar}
                source={{uri: chatItem.user.image_url}}
              />
            ) : chatUserName ? (
              <View style={[styles.msgAvatar, styles.acronymAvatar]}>
                <Text
                  type={'body2'}
                  size={theme.typography.fontSizes.sm}
                  color={theme.colors.typography.silver}>
                  {getAcronym(chatItem.user, 'user')}
                </Text>
              </View>
            ) : (
              <Image
                resizeMode="contain"
                style={styles.msgAvatar}
                source={images.ic_userprofile}
              />
            )}

            <View
              style={[
                styles.bubbleWrapper,
                {
                  alignItems: 'flex-start',
                  marginLeft: theme.normalize(8),
                  maxWidth: '80%',
                },
              ]}>
              <View style={[styles.bubbleContainerVisitor]}>
                {userFileJSX ? (
                  userFileJSX
                ) : (
                  <Text type={'body2'} style={styles.textStyle} color={'black'}>
                    {msg}
                  </Text>
                )}
              </View>

              {!isTimeStampHide ? (
                <ChatMsgInfo
                  timeStampRight={timeStampRight}
                  time={timestamp}
                  userData={chatItem}
                />
              ) : null}
            </View>
          </View>
        )}
      </>
    ),
    [chatItem, msg, isUser],
  );
}

export default ChatBubbleAgent;

const styles = StyleSheet.create({
  bubbleWrapper: {
    height: 'auto',
    width: '100%',
    paddingVertical: 2,
    alignItems: 'flex-end',
    marginBottom: theme.normalize(10),
  },
  bubbleContainer: {
    backgroundColor: '#306CFF',
    borderRadius: 10,
    borderTopRightRadius: 2,
  },
  textStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxWidth: '80%',
    minWidth: 35,
  },
  bubbleContainerVisitor: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderTopLeftRadius: 2,
  },
  msgAvatar: {
    height: theme.sizes.image.xl3,
    width: theme.sizes.image.xl3,
    borderRadius: theme.sizes.image.xl3 / 2,
  },
  acronymAvatar: {
    backgroundColor: theme.colors.brandColor.visitorAvatarColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acronymText: {
    color: 'white',
    fontSize: 10,
  },
});
