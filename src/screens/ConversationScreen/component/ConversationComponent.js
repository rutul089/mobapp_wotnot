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
  Platform,
  ActivityIndicator,
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
  ImageViewer,
} from '../../../components';
import Spacing from '../../../components/Spacing';
import {strings} from '../../../locales/i18n';
import theme from '../../../util/theme';
import colors from '../../../util/theme/colors';
import styles from '../Style';
import ButtonTeammate from './ButtonTeammate';
import AssigneeItem from './AssigneeItem';
import {CONVERSATION} from '../../../constants/global';
import {
  getAgentDetails,
  getChatMsgType,
  getFormChatItemWithResponse,
  userFileResponseElement,
} from '../../../util/ChatHistoryHelper';
import ChatDateStampLabel from './ChatComponent/ChatDateStampLabel';
import ChatText from './ChatComponent/ChatText';
import ChatImg from './ChatComponent/ChatImg';
import ChatFileBlock from './ChatComponent/ChatFileBlock';
import ChatFileResponse from './ChatComponent/ChatFileResponse';
import ChatNote from './ChatComponent/ChatNote';
import ChatSlider from './ChatComponent/ChatSlider';
import ChatOptionsButton from './ChatComponent/ChatOptionsButton';
import ChatCalendar from './ChatComponent/ChatCalendar';
import ChatForm from './ChatComponent/ChatForm';
import ChatCardView from './ChatComponent/ChatCardView';
import ChatListView from './ChatComponent/ChatListView';
import ChatAppointmentBooking from './ChatComponent/ChatAppointmentBooking';
import ChatVideoView from './ChatComponent/ChatVideoView';
import AutoGrowTextInputManager from '../../../util/AutoGrowTextInputManager';
import ChatTyping from './ChatComponent/ChatTyping';
import {registerVisitorTypingHandler} from '../../../websocket';
import {bytesToSize} from '../../../util/helper';

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
  joinButton,
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
  onChangeText,
  messageHistory,
  users,
  isClosed,
  chatUserName,
  searchSaveReply,
  savedReply,
  onSearchSaveReply,
  showSavedReply,
  save_reply_list,
  onCloseSaveReply,
  replyLoading,
  onSaveReplyClick,
  handleLoadMore,
  isLoadMore,
  mediaData,
  onMediaPreviewCancel,
}) => {
  const [typingData, setTypingData] = React.useState();
  const [imageModalShow, setImageModalShow] = React.useState(false);
  const [modalImg, setImageModalUrl] = React.useState();

  React.useEffect(() => {
    registerVisitorTypingHandler(e => {
      if (!isLoading && itemData) {
        if (itemData?.thread_key === e?.conversation_key) {
          let newMsg = {
            ...itemData,
            type: 'typing',
            name: itemData?.title,
            key: Math.random(),
          };
          setTypingData(newMsg);
        }
      }
    });
  });

  function onToggleImageModal(img) {
    setImageModalShow(true);
    setImageModalUrl(img);
  }

  const _renderItemView = ({item, index}) => {
    let msgType = getChatMsgType(item);
    let itemWithAccountDetails =
      item.agent && !item.agent.id ? getAgentDetails(item, users) : item;
    let formResponse =
      msgType === 'form'
        ? getFormChatItemWithResponse(
            index,
            messageHistory,
            itemWithAccountDetails,
          )
        : null;

    return (
      <View style={styles.renderItem.mainContainer}>
        {renderItem(item, msgType, itemWithAccountDetails, formResponse)}
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
  const _renderJoinConversationView = () => {
    return (
      <View style={styles.bottomMainContainer}>
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
      </View>
    );
  };
  const _renderInputTextView = () => {
    // mediaData
    return (
      <View
        style={{
          backgroundColor: '#FEFEFE',
          padding: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 3,
          zIndex: 50000,
          // borderTopWidth: 1,
          // borderTopColor: theme.colors.typography.silver,
        }}>
        {mediaData ? (
          <View
            style={{
              backgroundColor: '#f0f2f5',
              marginBottom: 5,
              borderRadius: 8,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.8}}>
              <Text numberOfLines={1} type={'body2'}>
                {mediaData?.name}
              </Text>
              <Text type={'caption12'}>{bytesToSize(mediaData?.size)} </Text>
            </View>
            <View
              style={{
                flex: 0.1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={onMediaPreviewCancel}
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  source={images.ic_cross}
                  style={{
                    tintColor: theme.colors.brandColor.silver,
                    height: theme.sizes.icons.xs,
                    width: theme.sizes.icons.xs,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              backgroundColor: '#f0f2f5',
              borderRadius: 12,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={showMenuOptions}
              style={{
                justifyContent: 'flex-end',
                bottom: theme.normalize(Platform.OS === 'android' ? 11 : 5),
              }}>
              <Image
                source={images.ic_hamburger}
                resizeMode="contain"
                style={styles.sendMessageContainer.attachmentButton}
              />
            </TouchableOpacity>
            <AutoGrowTextInputManager
              style={{
                paddingHorizontal: theme.normalize(10),
                paddingVertical: theme.normalize(5),
                fontSize: 16,
                flex: 1,
                // backgroundColor: '#f0f2f5',
                // borderRadius: 12,
                textAlignVertical: 'top',
                justifyContent: 'center',
                fontFamily: theme.typography.fonts.circularStdBook,
              }}
              placeholder={'Send Message'}
              placeholderTextColor={theme.colors.typography.silver}
              maxHeight={100}
              minHeight={40}
              enableScrollToCaret
              numberOfLines={1}
              onChangeText={updateMessageValue}
              value={messageToSend}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={onSendPress}
              style={{
                justifyContent: 'flex-end',
                bottom: theme.normalize(Platform.OS === 'android' ? 11 : 5),
              }}>
              <Image
                source={images.ic_send}
                resizeMode="contain"
                style={styles.sendMessageContainer.attachmentButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const renderItem = (item, msgType, itemWithAccountDetails, formResponse) => {
    console.log('msgType', msgType);
    switch (msgType) {
      case 'file.response': {
        let files = userFileResponseElement(itemWithAccountDetails);
        return (
          <ChatFileResponse
            fileList={files}
            chatUserName={itemData?.title}
            itemWithAccountDetails={itemWithAccountDetails}
            onToggleImageModal={onToggleImageModal}
          />
        );
      }
      case 'status': {
        return (
          <ChatDateStampLabel
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            loggedInUserId={userID}
          />
        );
      }
      case 'assigned': {
        return (
          <ChatDateStampLabel
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            loggedInUserId={userID}
          />
        );
      }
      case 'phone':
      case 'text': {
        return (
          <ChatText
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            onToggleImageModal={() => {}}
            chatUserName={itemData?.title}
          />
        );
      }
      case 'image': {
        return (
          <ChatImg
            chatItem={itemWithAccountDetails}
            onToggleImageModal={onToggleImageModal}
            onToggleImageModal123={e => console.log('00000')}
          />
        );
      }
      case 'document':
      case 'audio':
      case 'file': {
        return (
          <ChatText
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
          />
        );
      }
      case 'slider.response': {
        return (
          <ChatText
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            textMsg={JSON.parse(itemWithAccountDetails.user.message.text)}
          />
        );
      }
      case 'note': {
        return (
          <ChatNote
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            textMsg={itemWithAccountDetails.agent.note}
            onToggleImageModal={() => {}}
          />
        );
      }
      case 'slider': {
        return (
          <ChatSlider
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
          />
        );
      }
      case 'list': {
        return (
          <ChatListView
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            // retainButtonListUponSelection={retainButtonListUponSelection}
          />
        );
      }
      case 'options': {
        return (
          <ChatOptionsButton
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            // retainButtonListUponSelection={retainButtonListUponSelection}
          />
        );
      }
      case 'calendar': {
        return (
          <ChatCalendar
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            textMsg={
              JSON.parse(itemWithAccountDetails.agent.message.text).title
            }
          />
        );
      }
      case 'form': {
        return (
          <ChatForm
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={formResponse ? formResponse : itemWithAccountDetails}
          />
        );
      }
      case 'cardview': {
        return (
          <ChatCardView
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            slides={JSON.parse(itemWithAccountDetails.agent.message.text).items}
            avatar={itemWithAccountDetails.agent.avatar}
            onToggleImageModal={onToggleImageModal}
          />
        );
      }
      case 'appointment_booking': {
        return (
          <ChatAppointmentBooking
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            avatar={itemWithAccountDetails.agent.avatar}
            onToggleImageModal={onToggleImageModal}
          />
        );
      }
      case 'video': {
        return (
          <ChatVideoView
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
          />
        );
      }
    }
  };
  const _renderSaveReplyView = () => {
    return (
      <Modal
        animationType="slide"
        visible={showSavedReply}
        style={{backgroundColor: 'black'}}
        statusBarTranslucent={false}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: theme.colors.brandColor.FAFAFA}}>
          <View style={{overflow: 'hidden', paddingBottom: 1}}>
            <View style={styles.assigneeHeader}>
              <TouchableOpacity activeOpacity={0.5} onPress={onCloseSaveReply}>
                <Image
                  source={images.ic_cross}
                  resizeMode="contain"
                  style={styles.assigneeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Input
            containerStyle={{padding: 5, backgroundColor: 'white'}}
            computedLeftIcon={images.ic_search}
            isLeftIconElementVisible
            tintColor={theme.colors.brandColor.blue}
            placeholder={'Search'}
            onChangeText={onSearchSaveReply}
            value={searchSaveReply}
            leftIconDisabled
            returnKeyType="done"
            // onSubmitEditing={onSubmitEditing && onSubmitEditing}
          />
          {replyLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator
                size="large"
                color={theme.colors.brandColor.blue}
              />
            </View>
          ) : (
            <FlatList
              stickyHeaderHiddenOnScroll={true}
              ListHeaderComponentStyle={{paddingVertical: theme.normalize(8)}}
              ref={listRef}
              contentContainerStyle={{backgroundColor: 'white', flexGrow: 1}}
              data={save_reply_list}
              renderItem={({item, index}) => (
                <ActionItem
                  label={`${item?.title} - ${item?.reply}`}
                  onItemPress={() => onSaveReplyClick && onSaveReplyClick(item)}
                />
              )}
              style={{}}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                replyLoading ? null : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      flexGrow: 1,
                    }}>
                    <Text>No saved replies found</Text>
                  </View>
                )
              }
            />
          )}
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
        isMoreIconHidden={isClosed}
      />

      <View style={styles.container}>
        <FlatList
          ref={listRef}
          data={messageHistory}
          renderItem={_renderItemView}
          keyExtractor={(item, index) =>
            item?.timestamp + String(messageHistory.length - index)
          }
          // ListHeaderComponent={_renderListHeaderView}
          extraData={messageList}
          style={{
            paddingHorizontal: theme.sizes.spacing.ph,
          }}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={<View style={{height: 100}} />}
          ListFooterComponent={
            <View style={{marginTop: theme.sizes.spacing.pv}}>
              {isLoadMore ? (
                <ActivityIndicator
                  size="large"
                  color={theme.colors.brandColor.blue}
                />
              ) : null}
            </View>
          }
          inverted
          ListEmptyComponent={
            isLoading ? null : (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  flexGrow: 1,
                }}>
                <Text>No conversation found</Text>
              </View>
            )
          }
          // maxToRenderPerBatch={35}
          // scrollEventThrottle={16}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        <ChatTyping
          typingMsg={typingData}
          style={{paddingHorizontal: theme.sizes.spacing.ph, marginBottom: 5}}
        />
        {isLoading
          ? null
          : isClosed
          ? null
          : joinButton
          ? _renderJoinConversationView()
          : _renderInputTextView()}
      </View>

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
        height={theme.normalize(180)}
        closeOnDragDown={false}
        customStyles={styles.bottomSheetContainer.mainContainer}>
        <ScrollView
          style={{flexGrow: 1}}
          contentContainerStyle={{paddingTop: 10}}>
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
        </ScrollView>
      </BottomSheet>
      {_renderChangeAssigneeView()}
      {_renderSaveReplyView()}
      <ImageViewer
        modalShow={imageModalShow}
        modalImg={modalImg}
        onRequestClose={() => setImageModalShow(false)}
      />
      <Loader loading={isLoading} />
    </FlexContainer>
  );
};

export default ConversationComponent;
