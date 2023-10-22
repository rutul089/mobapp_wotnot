import {Chip} from '@rneui/themed';
import {Button as InButton} from 'native-base';
import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import images from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {
  Button,
  FlexContainer,
  Loader,
  Spacing,
  Text,
} from '../../../components';
import {styles as textStyle} from '../../../components/Text/style';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import styles from '../Style';

const SaveRecoveryComponent = ({
  isLoading,
  recovery_codes,
  onDoneClick,
  onCopyCodeClick,
}) => {
  return (
    <FlexContainer>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.mainContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Spacing size="md" />
          <SVG.LoginLogoIcon />
          <Spacing size="xl" />
          <Text type={'h3'}>{strings('login.2FA_SETUP_SCREEN_SETUP_HEADING')}</Text>
          <Spacing size="md" />
        </View>
        <View style={styles.doneStyleContainer}>
          <Image source={images.ic_done} style={styles.icDoneIcon} />
          <Text
            type={'body1'}
            lineHeight={theme.sizes.icons.lg}
            color={'#FFA043'}
            numberOfLines={2}
            style={{flex: 1}}>
            {strings('login.2FA_SETUP_SCREEN_SETUP_COMPLETION_ALERT')}
          </Text>
        </View>
        <Spacing size="md" />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text type={'body1'} textAlign={'center'}>
            {strings('login.SETUP_COMPLETION_SUB_HEADING')}
          </Text>
        </View>
        <Spacing size="xl" />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          {recovery_codes?.map((item, index) => {
            return (
              <Chip
                key={`${index}`}
                title={item}
                type="outline"
                titleStyle={textStyle.body2}
                buttonStyle={{borderColor: '#858585', borderRadius: 5}}
                containerStyle={{borderRadius: 0, margin: 5}}
              />
            );
          })}
        </View>
        <Spacing size="xl" />
      </ScrollView>
      <View style={{padding: theme.sizes.spacing.ph, flexDirection: 'row'}}>
        <InButton
          onPress={onDoneClick}
          variant={'outline'}
          _text={{
            color: theme.colors.brandColor.blue,
            fontWeight: theme.typography.fontWeights.medium,
            fontFamily: theme.typography.fonts.circularStdMedium,
          }}
          style={{borderColor: theme.colors.brandColor.blue}}>
          {`  ${strings('button.2FA_SETUP_SCREEN_SETUP_DONE_BUTTON')}  `}
        </InButton>
        <Spacing direction="x" size="md" />
        <Button
          bg={theme.colors.brandColor.blue}
          style={{flex: 1}}
          buttonText={strings('button.RECOVERY_CODES_BUTTON')}
          onPress={onCopyCodeClick}
        />
      </View>

      <Loader loading={isLoading} />
    </FlexContainer>
  );
};

export default SaveRecoveryComponent;
