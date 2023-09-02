import React from 'react';
import {Image, ScrollView} from 'react-native';
import {ActionItem, FlexContainer, Header} from '../../../components';

import theme from '../../../util/theme';

const HelpDeskComponent = ({onPressLeftContent, state, onItemClick}) => (
  <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
    <Header isRightIconHidden onPressLeftContent={onPressLeftContent} />
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: theme.normalize(10),
      }}>
      {state?.helpDeskList?.map((item, index) => (
        <ActionItem
          key={index}
          label={item?.tittle}
          leftIcon={
            <Image
              resizeMode="contain"
              source={item?.image}
              style={{
                height: theme.sizes.icons.xl3,
                width: theme.sizes.icons.xl3,
                alignSelf: 'center',
                marginRight: theme.normalize(8),
              }}
            />
          }
          containerStyle={{
            height: theme.normalize(60),
            paddingHorizontal: theme.sizes.spacing.ph,
          }}
          onItemPress={() => onItemClick && onItemClick(item)}
        />
      ))}
    </ScrollView>
  </FlexContainer>
);

export default HelpDeskComponent;
