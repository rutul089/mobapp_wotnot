import React from 'react';
import {Image, PixelRatio, Pressable, StyleSheet, View} from 'react-native';
import images from '../../assets/images';
import {hp, wp} from '../../util/helper';
import theme from '../../util/theme';
import colors from '../../util/theme/colors';
import {ActivityIndicator} from '../ActivityIndicator';
import Spacing from '../Spacing';
import Text from '../Text/index';
import {timing} from 'react-native-redash';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {duration} from 'moment';

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
}) => {
  const radius = PixelRatio.roundToNearestPixel(6);
  const STROKE_WIDTH = 0;

  const renderAvatarView = () => {
    return (
      <View style={{}}>
        {isAvatar ? (
          <Image
            source={uri.length > 0 ? {uri: uri} : images.ic_userprofile}
            style={styles.image}
          />
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
      </View>
    );
  };

  const renderBodyView = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignSelf: 'center'}}>
          <Text
            type={'body2'}
            weight={theme.typography.fontWeights.medium}
            numberOfLines={1}>
            {name}
          </Text>
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
              style={{color: colors.brandColor.blue}}>
              {unreadCount?.length > 3 ? '999+' : unreadCount}
            </Text>
          </View>
        ) : null}

        <Spacing direction="y" size="sm" />
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text type={'caption12'} style={{color: colors.brandColor.silver}}>
            {lastMessageDay}
          </Text>
          {!hideAnimation ? (
            <AnimatedCircularProgress
              size={theme.normalize(13)}
              width={theme.normalize(6)}
              fill={100}
              tintColor="#13BE66"
              backgroundColor="white"
              padding={0}
              duration={duration}
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
    <Pressable
      style={{flex: 1, paddingVertical: 5, borderWidth: 0, marginBottom: 5}}
      onPress={onPress}>
      <View style={{flex: 1, flexDirection: 'row', borderWidth: 0}}>
        {renderAvatarView()}
        <Spacing direction="y" size="xs" />
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
              {subTittle}
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
    </Pressable>
    // <Pressable style={styles.pressableContainer} onPress={onPress}>
    //   <View style={{flex: 0.8}}>
    //     <View style={{gap: hp(0.1)}}>
    //       <View style={styles.container}>
    //         <View>
    //           {isAvatar ? (
    //             <Image
    //               source={uri.length > 0 ? {uri: uri} : images.ic_userprofile}
    //               style={styles.image}
    //             />
    //           ) : (
    //             <View
    //               style={[
    //                 styles.image,
    //                 {
    //                   justifyContent: 'center',
    //                   alignItems: 'center',
    //                 },
    //               ]}>
    //               <Text>{name?.slice(0, 2)?.toUpperCase()}</Text>
    //             </View>
    //           )}
    //           <View
    //             style={[
    //               styles.badgeContainer,
    //               {
    //                 backgroundColor: isOnline
    //                   ? theme.colors.brandColor.green
    //                   : theme.colors.brandColor.silver,
    //               },
    //             ]}
    //           />
    //         </View>
    //         <Spacing direction="y" size="xs" />
    //         <View style={styles.rightContainer}>
    //           <Text type={'body2'} weight={theme.typography.fontWeights.medium}>
    //             {name}
    //           </Text>
    //           <Text
    //             type={'caption12'}
    //             style={{color: colors.brandColor.silver}}
    //             numberOfLines={1}>
    //             {email}
    //           </Text>
    //         </View>
    //       </View>
    //     </View>
    //     {subTittle && (
    //       <Text
    //         type={'caption12'}
    //         size={'xxs'}
    //         style={styles.subTittle}
    //         numberOfLines={1}>
    //         {subTittle}
    //       </Text>
    //     )}
    //   </View>
    //   <View style={styles.rightSideContainer}>
    //     {!isClosedMode ? (
    //       <View style={styles.unreadCountContainer}>
    //         <Text
    //           type={'caption12'}
    //           weight={theme.typography.fontWeights.bold}
    //           style={{color: colors.brandColor.blue}}>
    //           {unreadCount}
    //         </Text>
    //       </View>
    //     ) : (
    //       <View
    //         style={[
    //           styles.unreadCountContainer,
    //           {backgroundColor: '#00000000'},
    //         ]}
    //       />
    //     )}
    //     <View style={styles.statusContainer}>
    //       <Text type={'caption12'} style={{color: colors.brandColor.silver}}>
    //         {lastMessageDay}
    //       </Text>
    //       <View style={{width: radius * 2, height: radius * 2}}>
    //         <ActivityIndicator
    //           // strokeWidth={STROKE_WIDTH}
    //           radius={radius}
    //           // backgroundColor="#f93986"
    //           percentageComplete={30}
    //         />
    //       </View>
    //     </View>
    //   </View>
    // </Pressable>
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
    backgroundColor: colors.brandColor.lightestBlue,
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
    height: hp(4.2),
    width: hp(4.2),
    backgroundColor: colors.brandColor.lavenderBlue,
    padding: 2,
    borderRadius: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statusContainer: {justifyContent: 'center', alignItems: 'center'},
  subTittle: {
    marginTop: theme.sizes.spacing.xs2,
  },
});
