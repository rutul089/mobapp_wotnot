import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from '../../../../../components';
import images from '../../../../../assets/images';
import theme from '../../../../../util/theme';


const VisitorIcon = ({chatItem, chatUserName, acronymValue}) => (
  <View>
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
          {acronymValue}
        </Text>
      </View>
    ) : (
      <Image
        resizeMode="contain"
        style={styles.msgAvatar}
        source={images.ic_userprofile}
      />
    )}
  </View>
);
const styles = StyleSheet.create({
  msgAvatar: {
    height: theme.sizes.image.xl3,
    width: theme.sizes.image.xl3,
    borderRadius: theme.sizes.image.xl3 / 2,
  },
  acronymAvatar: {
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acronymText: {
    color: 'white',
    fontSize: 10,
  },
});
export default VisitorIcon;
