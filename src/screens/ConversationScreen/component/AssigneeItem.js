import React from 'react';
import {Image} from 'react-native';
import images from '../../../assets/images';
import {Text, ActionItem} from '../../../components';
import theme from '../../../util/theme';
import {VALIDATION_REGEX} from '../../../util/helper';

const AssigneeItem = ({
  item,
  isTeamSelected,
  isMe,
  profileImage,
  onItemPress,
  isDoneMarkShown
}) => (
  <>
    <ActionItem
      label={isTeamSelected ? item?.name : isMe ? 'Me' : item?.display_name}
      leftIcon={
        <Image
          resizeMode="contain"
          source={
            VALIDATION_REGEX?.isSvg.test(profileImage) ||
            !VALIDATION_REGEX?.isImageType.test(profileImage)
              ? images.ic_userprofile
              : {uri: profileImage}
          }
          style={{
            height: theme.sizes.icons.sm * 1.5,
            width: theme.sizes.icons.sm * 1.5,
            alignSelf: 'center',
            borderRadius: theme.sizes.icons.sm,
          }}
        />
      }
      borderBottomWidth={1}
      onItemPress={onItemPress}
      rightIcon={
        isDoneMarkShown ? (
          <Image
            resizeMode="contain"
            source={images.ic_check_mark}
            style={{
              height: theme.sizes.icons.sm,
              width: theme.sizes.icons.sm,
              tintColor: theme.colors.brandColor.blue,
            }}
          />
        ) : null
      }
    />
  </>
);

export default AssigneeItem;
