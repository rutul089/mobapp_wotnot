import React from 'react';
import {Image} from 'react-native';
import images from '../../../assets/images';
import {Text, ActionItem} from '../../../components';
import theme from '../../../util/theme';

const AssigneeItem = ({item, isTeamSelected}) => (
  <>
    <ActionItem
      label={isTeamSelected ? item?.name : item?.display_name}
      leftIcon={
        <Image
          resizeMode="contain"
          source={images.ic_userprofile}
          style={{
            height: theme.sizes.icons.sm * 1.5,
            width: theme.sizes.icons.sm * 1.5,
            alignSelf: 'center',
          }}
        />
      }
      borderBottomWidth={1}
    />
  </>
);

export default AssigneeItem;
