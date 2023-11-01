import React from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {SvgCssUri} from 'react-native-svg';
import images from '../../assets/images';
import {getTimeStamp} from '../../util/ConversationListHelper';
import {hp, wp} from '../../util/helper';
import theme from '../../util/theme';
import colors from '../../util/theme/colors';
import Spacing from '../Spacing';
import Text from '../Text/index';
import Ticker from './Ticker';
import {applyStyleToText} from '../../util/LocaleSupport';

const ChatItem = ({
  name,
  email,
  uri,
  subTittle,
  isOnline,
  unreadCount,
  lastMessageDay,
  onPress,
  isClosedMode,
  isAvatar,
  duration = 1,
  rating = 0,
  hideRating,
  hideUnreadCount,
  hideAnimation,
  hideReviewView,
  hideStatusIcon,
  paddingHorizontal = 0,
  backgroundColor = 'white',
  borderBottomWidth = 0,
  borderBottomColor = theme.colors.brandColor.borderColor,
  itemData,
  isLoading,
  typingData,
  hideGlobalChannelIcon,
  channelIcon,
  hideSlaErr,
  prefill,
  animation,
  onAnimationComplete,
}) => {
  const [isTyping, setIsTyping] = React.useState(false);
  const [isTypingData, setTypingData] = React.useState(null);
  // console.log('prefill', prefill);
  let typingTimeout = null;

  React.useEffect(() => {
    setTypingData(typingData);
  }, [typingData]);

  React.useEffect(() => {
    if (isTypingData?.conversation_key === itemData?.thread_key) {
      isTypingData ? setIsTyping(true) : null;
    }
  }, [typingData]);

  React.useEffect(() => {
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      setTypingData(false);
    }, 800);
    return () => {
      clearTimeout(typingTimeout);
      typingTimeout = null;
      setTypingData(null);
    };
  }, [typingData]);

  const renderAvatarView = () => {
    return (
      <View style={{}}>
        {isAvatar ? (
          uri?.toLowerCase()?.includes('svg') ? (
            <SvgCssUri
              style={[styles.image, {backgroundColor: 'transparent'}]}
              uri={uri}
            />
          ) : (
            <Image
              source={uri.length > 0 ? {uri: uri} : images.ic_userprofile}
              style={styles.image}
            />
          )
        ) : (
          <View
            style={[
              styles.image,
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Text>{name?.slice(0, 2)?.toUpperCase()}</Text>
          </View>
        )}
        {!hideStatusIcon ? (
          <View
            style={[
              styles.badgeContainer,
              {
                backgroundColor: isOnline
                  ? theme.colors.brandColor.green
                  : theme.colors.brandColor.silver,
              },
            ]}
          />
        ) : null}
      </View>
    );
  };

  const renderBodyView = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              type={'body2'}
              weight={theme.typography.fontWeights.medium}
              size={theme.typography.fontSizes.md}
              numberOfLines={1}>
              {name}
            </Text>
            {!hideGlobalChannelIcon ? (
              <Image
                source={channelIcon}
                resizeMode="contain"
                style={{
                  marginLeft: 4,
                  height: theme.sizes.icons.xs,
                  width: theme.sizes.icons.xs,
                }}
              />
            ) : null}
          </View>

          <Text
            type={'caption12'}
            style={{color: colors.brandColor.silver}}
            numberOfLines={1}>
            {email}
          </Text>
        </View>
        <Spacing direction="y" size="xs" />
        {!hideUnreadCount ? (
          <View style={styles.unreadCountContainer}>
            <Text
              type={'caption12'}
              weight={theme.typography.fontWeights.bold}
              size={Platform.OS === 'ios' ? 10 : 9}
              style={{color: colors.brandColor.blue}}>
              {unreadCount > 99 ? '999+' : unreadCount}
            </Text>
          </View>
        ) : null}
        <Spacing direction="y" size="xs" />
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flex: 0.15,
          }}>
          {itemData?.last_message_at ? (
            <Ticker
              msgCount={itemData?.unread_messages_count}
              readMsgCount={itemData?.read_messages_count}
              currentTime={getTimeStamp(itemData.last_message_at).timestamp}
            />
          ) : null}
          {/* <Text type={'caption12'} style={{color: colors.brandColor.silver}}>
            {lastMessageDay}
          </Text> */}
          {!hideAnimation ? (
            <AnimatedCircularProgress
              size={theme.normalize(13)}
              width={theme.normalize(6)}
              fill={100}
              tintColor="white"
              backgroundColor="#13BE66"
              padding={0}
              duration={duration}
              prefill={prefill}
              ref={animation}
              style={{transform: [{rotate: '270deg'}]}}
              onAnimationComplete={onAnimationComplete}
            />
          ) : null}
          {!hideSlaErr ? (
            <Image
              source={images.is_sla_err}
              style={{
                height: theme.normalize(13),
                width: theme.normalize(13),
              }}
            />
          ) : null}
          {/* <View
            style={{
              height: theme.normalize(12),
              width: theme.normalize(12),
              borderRadius: theme.normalize(12) / 2,
              backgroundColor: '#13BE66',
            }}
          /> */}
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      underlayColor="#DDDDDD"
      style={{
        flex: 1,
        paddingVertical: theme.normalize(10),
        borderWidth: 0,
        paddingHorizontal: paddingHorizontal,
        backgroundColor: backgroundColor,
        borderBottomWidth: borderBottomWidth,
        borderBottomColor: borderBottomColor,
      }}
      onPress={onPress}>
      <View>
        {itemData.assigneeChangeText || itemData.statusChangeText ? (
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,.8)',
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
              flex: 1,
              zIndex: 1,
              paddingHorizontal: 5,
              position: 'absolute',
              justifyContent: 'center',
            }}>
            <Text color={theme.colors.clear_blue} textAlign={'center'}>
              {itemData.statusChangeText
                ? itemData.statusChangeText
                : itemData.assigneeChangeText
                ? itemData.assigneeChangeText
                : null}
            </Text>
          </View>
        ) : null}
        <View style={{flex: 1, flexDirection: 'row'}}>
          {renderAvatarView()}
          {/* <Spacing direction="y" size="xs" /> */}
          {renderBodyView()}
        </View>

        {!hideReviewView ? (
          <View
            style={{
              marginTop: theme.normalize(3),
              flexDirection: 'row',
              paddingVertical: 1,
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text type={'caption12'} size={10} numberOfLines={1}>
                {/* {isTyping ? 'typing...' : subTittle?.replace(/\n/g, '')} */}
                {applyStyleToText(
                  isTyping
                    ? name
                      ? `${name} is typing`
                      : 'typing ...'
                    : subTittle?.replace(/\n/g, ''),
                  [
                    {
                      style: {
                        color: 'black',
                      },
                    },
                  ],
                  '<b>',
                  '</b>',
                  false,
                  'caption12',
                  1,
                )}
              </Text>
            </View>
            {!hideRating ? (
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.ic_star}
                  style={{
                    height: theme.sizes.icons.xs2,
                    width: theme.sizes.icons.xs2,
                    marginRight: 2,
                  }}
                  resizeMode="contain"
                />
                <Text type={'body2'} size={theme.sizes.icons.xs2}>
                  {rating}
                </Text>
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(0.8),
    gap: wp(2),
    backgroundColor: 'red',
  },
  container: {
    flexDirection: 'row',
  },
  image: {
    height: theme.sizes.image.xl4,
    width: theme.sizes.image.xl4,
    borderRadius: theme.sizes.image.xl4 / 2,
    marginRight: 10,
    backgroundColor: theme.colors.brandColor.visitorAvatarColor,
  },
  badgeContainer: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.brandColor.green,
    position: 'absolute',
    bottom: hp(0.3),
    right: wp(2.7),
  },
  rightContainer: {
    flex: 1,
    width: 'auto',
    justifyContent: 'center',
  },
  rightSideContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  unreadCountContainer: {
    height: hp(3.5),
    width: hp(3.5),
    backgroundColor: colors.brandColor.lavenderBlue,
    padding: 2,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statusContainer: {justifyContent: 'center', alignItems: 'center'},
  subTittle: {
    marginTop: theme.sizes.spacing.xs2,
  },
});
