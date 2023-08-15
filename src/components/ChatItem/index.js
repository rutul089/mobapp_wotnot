import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {hp, wp} from '../../util/helper';
import theme from '../../util/theme';
import Spacing from '../Spacing';
import Text from '../Text/index';

const ChatItem = ({name, email, uri, subTittle, isOnline, onPress}) => (
  <Pressable style={{padding: 5}} onPress={onPress}>
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
          <Text type={'caption12'}>{email}</Text>
        </View>
      </View>
      <Text type={'caption12'}>Bot: Great! in that case could you p...</Text>
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
  </Pressable>
);

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
    backgroundColor: 'cyan',
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
    justifyContent: 'center',
  },
  subTittle: {
    marginTop: theme.sizes.spacing.xs2,
  },
});
