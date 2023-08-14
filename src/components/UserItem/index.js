import React from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import Text from '../Text/index';
import theme from '../../util/theme';
import Spacing from '../Spacing';

const UserItem = ({name, email, uri, subTittle, isOnline}) => (
  <Pressable style={{padding: 5}}>
    <View style={styles.container}>
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
      <Spacing direction="y" size="xs" />
      <View style={styles.rightContainer}>
        <Text type={'body2'} weight={theme.typography.fontWeights.medium}>
          {name}
        </Text>
        <Text type={'caption12'}>{email}</Text>
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
  </Pressable>
);

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    height: theme.sizes.image.xl4,
    width: theme.sizes.image.xl4,
    borderRadius: theme.sizes.image.xl4 / 2,
    marginRight: 10,
  },
  badgeContainer: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.brandColor.green,
    position: 'absolute',
    bottom: 0,
    left: theme.sizes.image.xl4 - 14,
    right: 0,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subTittle: {
    marginTop: theme.sizes.spacing.xs2,
  },
});
