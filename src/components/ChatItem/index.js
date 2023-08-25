import React from 'react';
import {Image, PixelRatio, Pressable, StyleSheet, View} from 'react-native';
import {hp, wp} from '../../util/helper';
import theme from '../../util/theme';
import colors from '../../util/theme/colors';
import {ActivityIndicator} from '../ActivityIndicator';
import Spacing from '../Spacing';
import Text from '../Text/index';

const ChatItem = ({
  name,
  email,
  uri,
  subTittle,
  isOnline,
  unreadCount,
  lastMessageDay,
  onPress,
}) => {
  const radius = PixelRatio.roundToNearestPixel(6);
  const STROKE_WIDTH = 0;
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(0.8),
        gap: wp(2),
      }}
      onPress={onPress}>
      <View style={{flex: 0.8}}>
        <View style={{gap: hp(0.1)}}>
          <View style={styles.container}>
            <View>
              <Image source={{uri: uri}} style={styles.image} />
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
            <Spacing direction="y" size="xs" />
            <View style={styles.rightContainer}>
              <Text type={'body2'} weight={theme.typography.fontWeights.medium}>
                {name}
              </Text>
              <Text
                type={'caption12'}
                style={{color: colors.brandColor.silver}}
                numberOfLines={1}>
                {email}
              </Text>
            </View>
          </View>
        </View>
        {subTittle && (
          <Text
            type={'caption12'}
            size={'xxs'}
            style={styles.subTittle}
            numberOfLines={1}>
            {subTittle}
          </Text>
        )}
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
          alignItems: 'center',
          gap: wp(2),
        }}>
        <View
          style={{
            height: hp(4),
            width: hp(4),
            backgroundColor: colors.brandColor.lightBlue,
            padding: 2,
            borderRadius: hp(4),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            type={'caption12'}
            weight={theme.typography.fontWeights.bold}
            style={{color: colors.brandColor.blue}}>
            {unreadCount}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text type={'caption12'} style={{color: colors.brandColor.silver}}>
            {lastMessageDay}
          </Text>
          <View style={{width: radius * 2, height: radius * 2}}>
            <ActivityIndicator
              strokeWidth={STROKE_WIDTH}
              radius={radius}
              backgroundColor="#f93986"
              percentageComplete={89}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
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
    bottom: hp(0.1),
    right: wp(2.7),
  },
  rightContainer: {
    flex: 1,
    width: 'auto',
    justifyContent: 'center',
  },
  subTittle: {
    marginTop: theme.sizes.spacing.xs2,
  },
});
