import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import theme from '../../util/theme';
import images from '../../assets/images';
import Text from '../Text/index';
import UserItem from '../UserItem/index';
import Spacing from '../Spacing';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.brandColor.FAFAFA,
    height: theme.sizes.spacing.xl3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.sizes.spacing.ph,
  },
  iconStyle: {
    height: theme.sizes.icons.md,
    width: theme.sizes.icons.md,
    resizeMode: 'contain',
  },
  logoStyle: {
    width: theme.normalize(91),
    height: theme.sizes.icons.xl4,
  },
});

const Header = ({
  tintColor = theme.colors.brandColor.silver,
  isLeftIconHidden,
  isRightIconHidden,
  isCenterDisabled,
  centerElement,
  isRightDisabled,
  leftIcon,
  onPressLeftContent,
  isLeftDisabled,
  onPressMore,
  onPressInfo,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {!isLeftIconHidden ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPressLeftContent}
            disabled={isLeftDisabled}>
            {leftIcon ? (
              leftIcon
            ) : (
              <Image
                source={images.ic_back}
                resizeMode="contain"
                style={[styles.iconStyle, {tintColor: tintColor}]}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      {!isCenterDisabled ? (
        <View
          style={[
            {
              flex: 9,
              justifyContent: 'center',
            },
            typeof centerElement !== 'string' && {alignItems: 'center'},
          ]}>
          {typeof centerElement === 'string' ? (
            <UserItem
              name={'Sagar Shah'}
              email={'Bot, Ahmedabad, India'}
              uri={'https://i.pravatar.cc/512'}
            />
          ) : (
            <Image
              source={images.ic_wotnot_logo}
              resizeMode={'contain'}
              style={styles.logoStyle}
            />
          )}
        </View>
      ) : null}
      <View style={{flex: isRightIconHidden ? 1 : 1.5, paddingHorizontal: 5}}>
        {!isRightIconHidden ? (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressInfo}
              disabled={isRightDisabled}>
              <Image
                source={images.ic_info}
                resizeMode="contain"
                style={[styles.iconStyle, {tintColor: tintColor}]}
              />
            </TouchableOpacity>
            <Spacing direction="y" />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onPressMore}
              disabled={isRightDisabled}>
              <Image
                source={images.ic_more}
                resizeMode="contain"
                style={[styles.iconStyle, {tintColor: tintColor}]}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
