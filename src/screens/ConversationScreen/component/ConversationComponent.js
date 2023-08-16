import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import styles from '../Style';
import {
  FlexContainer,
  Header,
  Text,
  Button,
  BottomSheet,
  ActionItem,
} from '../../../components';
import theme from '../../../util/theme';
import Spacing from '../../../components/Spacing';
import {strings} from '../../../locales/i18n';

const ConversationComponent = ({
  joinConversation,
  joinConversationBtn,
  joinConversationPress,
  onPressMore,
  onPressInfo,
  moreInfoModalRef,
  onChangeAssignee,
  onCloseConversation,
}) => {
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isLeftIconHidden={false}
        centerElement={'userInput'}
        onPressMore={onPressMore}
        onPressInfo={onPressInfo}
      />
      <View style={styles.container}>
        <Text>Thies is test</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text type={'caption12'} style={{width: '96%'}} textAlign={'center'}>
          {joinConversation}
        </Text>
        <Spacing />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnStyle}
          onPress={joinConversationPress}>
          <Text type={'button2'} color={'white'}>
            {joinConversationBtn}
          </Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={moreInfoModalRef}
        height={theme.normalize(160)}
        closeOnDragDown
        customStyles={{
          mask: {backgroundColor: 'transparent'},
          container: {
            elevation: 100,
            borderTopLeftRadius: theme.normalize(2),
            borderTopRightRadius: theme.normalize(2),
          },
        }}>
        <>
          <ActionItem
            label={strings('chat.change_assignee')}
            onItemPress={onChangeAssignee}
          />
          <ActionItem
            label={strings('chat.close_conversation')}
            onItemPress={onCloseConversation}
          />
        </>
      </BottomSheet>
    </FlexContainer>
  );
};

export default ConversationComponent;
