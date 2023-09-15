import React from 'react';
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import images from '../../../assets/images';
import {
  ActionItem,
  BottomSheet,
  FlexContainer,
  Header,
  Text,
  Loader,
  Input,
} from '../../../components';
import Spacing from '../../../components/Spacing';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import colors from '../../../util/theme/colors';
import styles from '../Style';
import ButtonTeammate from './ButtonTeammate';
import AssigneeItem from './AssigneeItem';
import {CONVERSATION} from '../../../constants/global';

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
  showChangeAssignee,
  onChangeAssigneeModalClose,
  onTeamMateClick,
  onTeamClick,
  isTeamSelected,
  teamMateData,
  teamData,
  itemData,
  userID,
  onTeamItemPress,
  isLoading,
  isMoreIconHidden,
  searchValue,
  onChangeText
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
  const _renderAssigneeItemView = ({item}) => {
    return (
      <AssigneeItem
        item={item}
        isTeamSelected={isTeamSelected}
        isMe={item?.id === userID}
        profileImage={item?.image_url?.small}
        onItemPress={() => onTeamItemPress && onTeamItemPress(item)}
        isDoneMarkShown={
          itemData?.assignee
            ? itemData?.assignee?.id === item?.id
            : itemData?.assignee === item?.id
        }
      />
    );
  };
  const _renderChangeAssigneeView = () => {
    return (
      <Modal
        animationType="slide"
        visible={showChangeAssignee}
        style={{backgroundColor: 'black'}}
        statusBarTranslucent={false}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: theme.colors.brandColor.FAFAFA}}>
          <View style={{overflow: 'hidden', paddingBottom: 1}}>
            <View style={styles.assigneeHeader}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onChangeAssigneeModalClose}>
                <Image
                  source={images.ic_cross}
                  resizeMode="contain"
                  style={styles.assigneeIcon}
                />
              </TouchableOpacity>
              <Text type={'body1'} textAlign={'center'} style={{flex: 1}}>
                {strings('chat.change_assignee')}
              </Text>
              <View style={styles.assigneeIcon} />
            </View>
          </View>
          <Input
            containerStyle={{padding: 5, backgroundColor: 'white'}}
            computedLeftIcon={images.ic_search}
            isLeftIconElementVisible
            tintColor={theme.colors.brandColor.blue}
            placeholder={'Search from teams and teammates'}
            onChangeText={onChangeText}
            value={searchValue}
            leftIconDisabled
            returnKeyType="done"
            // onSubmitEditing={onSubmitEditing && onSubmitEditing}
          />
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderColor: theme.colors.borderColor,
            }}>
            <ButtonTeammate
              tittle={'Teammates'}
              onPress={onTeamMateClick}
              isSelected={!isTeamSelected}
            />
            <ButtonTeammate
              tittle={'Team'}
              onPress={onTeamClick}
              isSelected={isTeamSelected}
            />
          </View>

          <FlatList
            stickyHeaderHiddenOnScroll={true}
            ListHeaderComponentStyle={{paddingVertical: theme.normalize(8)}}
            ref={listRef}
            contentContainerStyle={{backgroundColor: 'white', flexGrow: 1}}
            data={isTeamSelected ? teamData : teamMateData}
            renderItem={_renderAssigneeItemView}
            style={{}}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>

        {/* <View /> */}
      </Modal>
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
        userItem={{
          name: itemData?.title,
          subTittle: `${itemData?.assignee?.name} | ${itemData?.city_name},${itemData?.country_name}`,
          isOnline:
            itemData?.visitor_status === CONVERSATION.USER_STATUS.ONLINE,
        }}
        isMoreIconHidden={
          itemData?.status_id === CONVERSATION.CLOSED_MESSAGE_TYPE
        }
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
        <ScrollView scrollEnabled={false}>
          <ActionItem
            label={strings('chat.change_assignee')}
            onItemPress={onChangeAssignee}
          />
          <ActionItem
            label={strings('chat.close_conversation')}
            onItemPress={onCloseConversation}
          />
        </ScrollView>
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
      {_renderChangeAssigneeView()}
      <Loader loading={isLoading} />
    </FlexContainer>
  );
};

export default ConversationComponent;
