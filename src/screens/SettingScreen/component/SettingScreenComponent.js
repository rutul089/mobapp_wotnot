import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {FlexContainer, UserItem, SwitchToggle, Text} from '../../../components';
import theme from '../../../util/theme';
import images from '../../../assets/images';
import styles from '../Style';
import {Switch} from '../../../components/Switch/Switch';
import Spacing from '../../../components/Spacing';
import {strings} from '../../../locales/i18n';

const SettingScreenComponent = ({params}) => (
  <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
    <View style={styles.headerStyle}>
      <Image
        source={images.ic_wotnot_logo}
        resizeMode={'contain'}
        style={styles.logoStyle}
      />
    </View>
    <ScrollView contentContainerStyle={styles.container}>
      <UserItem
        name={'Sagar Shah'}
        email={'sagar.shah@wotnot.io'}
        uri={'https://i.pravatar.cc/512'}
      />
      <Spacing size="md" />
      <View style={{flexDirection: 'row'}}>
        <Text type={'body1'} style={{flex: 1}}>
          {strings('settings.active_status')}
        </Text>
        <SwitchToggle
          switchOn={true}
          onPress={() => {}}
          circleColorOff="white"
          circleColorOn="white"
          backgroundColorOn="#13BE66"
          backgroundColorOff="#B1B8BB"
          containerStyle={{
            width: theme.sizes.xl15,
            height: theme.sizes.xl14,
            borderRadius: theme.sizes.xl5,
            padding: 5,
          }}
          circleStyle={{
            width: theme.sizes.icons.xs,
            height: theme.sizes.icons.xs,
            borderRadius: 30,
          }}
        />
      </View>
      <Text type={'body3-10'} style={{width: '60%', marginTop: 7}}>
        {strings('settings.active_status_message')}
      </Text>
      <Spacing size="md" />
    </ScrollView>
  </FlexContainer>
);

export default SettingScreenComponent;
