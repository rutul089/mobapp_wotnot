import React from 'react';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import {
  SwitchToggle,
  FlexContainer,
  Header,
  Text,
  Spacing,
  CheckBox,
  RadioGroup,
} from '../../../components';
import theme from '../../../util/theme';
import styles from '../style';

const NotificationComponent = ({
  onPressLeftContent,
  isActive,
  onSwitchToggle,
  humanHandoverClick,
  newMessageReceivedClick,
  playNotificationSoundClick,
  state,
  selectNotificationSound,
  soundList,
  selectedSound,
}) => (
  <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
    <Header isRightIconHidden onPressLeftContent={onPressLeftContent} />
    {state.isLoading ? (
      <ActivityIndicator
        size="large"
        color={theme.colors.brandColor.blue}
        style={{alignSelf: 'center', flex: 1}}
      />
    ) : (
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text type={'body1'} style={{flex: 1}}>
            Enable Notifications
          </Text>
          <SwitchToggle
            switchOn={state.isActive}
            onPress={onSwitchToggle}
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
        <Spacing size="xl" />
        <CheckBox
          title={'When a human handover is triggered'}
          onPress={humanHandoverClick}
          isChecked={state.isHumanHandover}
          disabled={!state.isActive}
        />
        <Spacing size={'xs'} />
        <CheckBox
          title={'When a new message from a existing chat is received'}
          onPress={newMessageReceivedClick}
          isChecked={state.isNewMessageReceived}
          disabled={!state.isActive}
        />
        <Spacing size={'xs'} />
        <CheckBox
          title={'When I receive notification play sound'}
          onPress={playNotificationSoundClick}
          isChecked={state.isPlayNotification}
          disabled={!state.isActive}
          childLayout={
            state.isPlayNotification ? (
              <RadioGroup
                disabled={!state.isActive}
                radioButtons={soundList}
                onPress={selectNotificationSound}
                selectedId={selectedSound}
                layout={'row'}
                radioBtnColor={
                  !state.isActive
                    ? 'rgba(0,0,0,0.4)'
                    : theme.colors.brandColor.blue
                }
                size={theme.sizes.icons.lg}
                containerStyle={{marginTop: 10}}
              />
            ) : null
          }
        />
        <Spacing size={'xs'} />
      </ScrollView>
    )}
  </FlexContainer>
);

export default NotificationComponent;
