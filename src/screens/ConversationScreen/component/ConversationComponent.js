import React from 'react';
import {FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native';
import images from '../../../assets/images';
import {
  ActionItem,
  BottomSheet,
  FlexContainer,
  Header,
  Text,
} from '../../../components';
import Spacing from '../../../components/Spacing';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import colors from '../../../util/theme/colors';
import styles from '../Style';

const ConversationComponent = ({
  joinConversation,
  joinConversationBtn,
  joinConversationPress,
  onPressMore,
  onPressInfo,
  moreInfoModalRef,
  onChangeAssignee,
  onCloseConversation,
  onPressLeftContent,
  conversationJoined,
  messageList,
  keyboardHeight,
  inputHeight,
  listRef,
  messageToSend,
  placeHolderMessage,
  updateMessageValue,
  showMenuOptions,
  onSendPress,
  attachmentBottomSheetRef,
  onSavedReplyPress,
  onCalendarPress,
  onAttachmentsPress,
}) => {
  const _renderListHeaderView = () => {
    return (
      <View style={styles.listHeader.mainAssignContainer}>
        <View style={styles.listHeader.assignContainer}>
          <Text type={'caption12'} style={{color: colors.white}}>
            You assigned this conversation to yourself - 5m
          </Text>
        </View>
      </View>
    );
  };
  const _renderItemView = ({item}) => {
    const {sent, message, uri, timeStamp} = item;
    return (
      <View style={styles.renderItem.mainContainer}>
        {!sent && <Image source={{uri: uri}} style={styles.renderItem.image} />}
        <View
          style={[
            styles.renderItem.renderItemContainer,
            sent
              ? styles.renderItem.sentBubble
              : styles.renderItem.receivedBubble,
          ]}>
          <View
            style={[
              styles.renderItem.innerContainer,
              sent
                ? styles.renderItem.innerContainerSent
                : styles.renderItem.innerContainerReceived,
            ]}>
            <Text
              style={
                sent
                  ? {
                      color: colors.white,
                    }
                  : {
                      color: colors.black,
                    }
              }>
              {message}
            </Text>
          </View>
          <Text style={styles.renderItem.timeStamp}>{timeStamp}</Text>
        </View>
      </View>
    );
  };
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isLeftIconHidden={false}
        centerElement={'userInput'}
        onPressMore={onPressMore}
        onPressInfo={onPressInfo}
        onPressLeftContent={onPressLeftContent}
      />
      {conversationJoined ? (
        <View style={styles.container}>
          <FlatList
            ref={listRef}
            data={messageList}
            renderItem={_renderItemView}
            ListHeaderComponent={_renderListHeaderView}
            style={{
              paddingHorizontal: theme.sizes.spacing.ph,
              paddingBottom: theme.sizes.spacing.xl,
            }}
            showsVerticalScrollIndicator={false}
          />
          <View
            style={styles.sendMessageContainer.mainContainer(
              inputHeight,
              keyboardHeight,
            )}>
            <TouchableOpacity activeOpacity={0.5} onPress={showMenuOptions}>
              <Image
                source={images.ic_hamburger}
                resizeMode="contain"
                style={styles.sendMessageContainer.attachmentButton}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.sendMessageContainer.inputBox(inputHeight)}
              underlineColorAndroid="transparent"
              value={messageToSend}
              onChangeText={updateMessageValue}
              placeholder={placeHolderMessage}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={onSendPress}>
              <Image
                source={images.ic_send}
                resizeMode="contain"
                style={styles.sendMessageContainer.sendButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.bottomMainContainer}>
          <View style={styles.bottomContainer}>
            <Text
              type={'caption12'}
              style={{width: '96%'}}
              textAlign={'center'}>
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
        </View>
      )}
      <BottomSheet
        ref={moreInfoModalRef}
        height={theme.normalize(160)}
        closeOnDragDown
        customStyles={styles.bottomSheetContainer.mainContainer}>
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
      <BottomSheet
        ref={attachmentBottomSheetRef}
        height={theme.normalize(160)}
        closeOnDragDown
        customStyles={styles.bottomSheetContainer.mainContainer}>
        <>
          <ActionItem
            label={strings('chat.saved_reply')}
            onItemPress={onSavedReplyPress}
            leftIcon={
              <Image
                source={images.ic_save}
                resizeMode="contain"
                style={styles.bottomSheetContainer.actionItemIcon}
              />
            }
          />
          <ActionItem
            label={strings('chat.calendar')}
            onItemPress={onCalendarPress}
            leftIcon={
              <Image
                source={images.ic_calendar}
                resizeMode="contain"
                style={styles.bottomSheetContainer.actionItemIcon}
              />
            }
          />
          <ActionItem
            label={strings('chat.attachment')}
            onItemPress={onAttachmentsPress}
            leftIcon={
              <Image
                source={images.ic_attach}
                resizeMode="contain"
                style={styles.bottomSheetContainer.actionItemIcon}
              />
            }
          />
        </>
      </BottomSheet>
    </FlexContainer>
  );
};

export default ConversationComponent;
