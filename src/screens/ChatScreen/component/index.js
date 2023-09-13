import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  FlexContainer,
  Header,
  Spacing,
  SwitchToggle,
  Text,
  UserItem,
  ChatItem,
} from '../../../components';
import theme from '../../../util/theme';
import images from '../../../assets/images';
import {styles as textStyle} from '../../../components/Text/style';
import {Tab, TabView} from '@rneui/themed';
import YouTab from '../container/YouTab';
import ConversationListTab from '../container/ConversationListTab';
import {useSelector} from 'react-redux';
import styles from '../Style';
import {CONVERSATION} from '../../../constants/global';
import {getDayDifference} from '../../../util/helper';
import {isValidJSON} from '../../../util/JSONOperations';

const renderTabView = (label, onPress, isSelected, isDisable) => {
  return (
    <TouchableOpacity
      disabled={isDisable}
      style={
        isSelected ? styles.selectedTanContainerStyle : styles.tabContainerStyle
      }
      onPress={onPress}>
      <Text
        textAlign={'center'}
        type={'body2'}
        color={
          isSelected
            ? theme.colors.typography.link
            : theme.colors.typography.black
        }>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const ChatScreenComponent = ({
  currentTab,
  onSelectTab,
  tabValues,
  open_status,
  onSearchClick,
  navigation,
  conversations,
  isLoading,
  onConversationClick = () => {},
  onRefresh = () => {},
  isRefreshing,
}) => {
  const [index, setIndex] = React.useState(0);
  const conversation_summary = useSelector(
    state => state.conversationReducer?.conversation_summary?.open_status,
  );
  const close_conversation_count = useSelector(
    state => state.conversationReducer?.closeConversationsCount,
  );
  const tabLabels = ['You', 'Assigned', 'Unassigned', 'Closed'];
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isLeftIconHidden={true}
        rightIcon={
          <View style={{flexDirection: 'row'}}>
            <Spacing size="md" direction="x" />
            <TouchableOpacity onPress={onSearchClick} style={{}}>
              <Image
                source={images.ic_search}
                style={{
                  height: theme.sizes.icons.lg,
                  width: theme.sizes.icons.lg,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <View
        style={{
          height: theme.normalize(36),
          backgroundColor: theme.colors.brandColor.FAFAFA,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderTabView(
            `(${conversation_summary?.you}) ${tabLabels[0]}`,
            () => onSelectTab(CONVERSATION.YOU),
            currentTab === CONVERSATION.YOU,
            isLoading,
          )}
          {renderTabView(
            `(${conversation_summary?.assigned}) ${tabLabels[1]}`,
            () => onSelectTab(CONVERSATION.ASSIGNED),
            currentTab === CONVERSATION.ASSIGNED,
            isLoading,
          )}
          {renderTabView(
            `(${conversation_summary?.unassigned}) ${tabLabels[2]}`,
            () => onSelectTab(CONVERSATION.UNASSIGNED),
            currentTab === CONVERSATION.UNASSIGNED,
            isLoading,
          )}
          {renderTabView(
            `${tabLabels[3]}`,
            () => onSelectTab(CONVERSATION.CLOSE),
            currentTab === CONVERSATION.CLOSE,
            isLoading,
          )}
        </ScrollView>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.brandColor.blue}
            style={{alignSelf: 'center', flex: 1}}
          />
        ) : (
          <FlatList
            data={conversations}
            renderItem={({item, index}) => (
              <ChatItem
                key={item?.assignee?.id}
                name={item?.title + ' ' + index ?? ''}
                email={`${
                  item?.assignee?.name ? item?.assignee?.name + ' | ' : ''
                }${item?.city_name},${item?.country_name}`}
                uri={item?.assignee?.image_url}
                isOnline={
                  item?.visitor_status === CONVERSATION.USER_STATUS.ONLINE
                }
                unreadCount={item?.unread_messages_count}
                lastMessageDay={getDayDifference(item?.last_message_at)}
                // subTittle={`${item?.message} `}
                subTittle={`${
                  item?.assignee ? item?.assignee?.name + ': ' : null
                } ${getMessage(item)}`}
                onPress={() => onConversationClick(item)}
                item={item}
                isClosedMode={item?.status_id === 2}
                rating={item?.rating}
                hideRating={currentTab !== CONVERSATION.CLOSE}
              />
            )}
            keyExtractor={(_it, index) => `${_it?.thread_key} ${index}`}
            contentContainerStyle={{
              flexGrow: 1,
              padding: theme.sizes.spacing.ph,
            }}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text color={theme.colors.brandColor.silver}>
                  No conversation found
                </Text>
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.brandColor.blue]}
              />
            }
          />
        )}
      </View>
      {/* <Tab
        value={currentTab}
        onChange={onSelectTab}
        indicatorStyle={{
          height: theme.normalize(2),
          backgroundColor: theme.colors.brandColor.blue,
        }}
        dense
        style={{
          backgroundColor: theme.colors.brandColor.FAFAFA,
        }}>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            currentTab == 0 && {color: theme.colors.brandColor.blue},
          ]}>
          {`You\n(${conversation_summary?.you})`}
        </Tab.Item>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            currentTab == 1 && {color: theme.colors.brandColor.blue},
          ]}>
          {`Assigned\n(${conversation_summary?.assigned})`}
        </Tab.Item>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            currentTab == 2 && {color: theme.colors.brandColor.blue},
          ]}>
          {`Unassigned\n(${conversation_summary?.unassigned})`}
        </Tab.Item>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            {textAlign: 'center'},
            currentTab == 3 && {color: theme.colors.brandColor.blue},
          ]}>
          {`Closed\n(${close_conversation_count})`}
        </Tab.Item>
      </Tab>
      <TabView value={currentTab} onChange={onSelectTab} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <ConversationListTab
            statusId={1}
            isYou={true}
            isAssignee={false}
            isUnAssignee={false}
            navigation={navigation}
            currentTab={currentTab}
            onSelectTab={onSelectTab}
          />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <ConversationListTab
            statusId={1}
            isYou={false}
            isAssignee={true}
            isUnAssignee={false}
            navigation={navigation}
            currentTab={currentTab}
            onSelectTab={onSelectTab}
          />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <ConversationListTab
            statusId={1}
            isAssignee={false}
            isYou={false}
            isUnAssignee={true}
            navigation={navigation}
            currentTab={currentTab}
            onSelectTab={onSelectTab}
          />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <ConversationListTab
            statusId={2}
            isYou={false}
            isAssignee={false}
            isUnAssignee={false}
            navigation={navigation}
            currentTab={currentTab}
            onSelectTab={onSelectTab}
          />
        </TabView.Item>
      </TabView> */}
    </FlexContainer>
  );
};

const getMessage = item => {
  let message = null;
  let data = isValidJSON(item.message) ? JSON.parse(item.message) : null;
  if (
    data &&
    data.version &&
    data.version === 2 &&
    data.type === 'send_message'
  ) {
    let messageItem = isValidJSON(data.text) ? JSON.parse(data.text) : null;
    if (messageItem) {
      if (messageItem.type === 'text') {
        message = messageItem.text;
      } else {
        let fileItem = messageItem.video
          ? messageItem.video
          : messageItem.document
          ? messageItem.document
          : messageItem.audio
          ? messageItem.audio
          : messageItem.image
          ? messageItem.image
          : null;

        if (fileItem) {
          message = `${fileItem.file_name}`;
        } else {
          message = 'File';
        }
      }
    }
  } else if (data.type === 'text') {
    message = data.text;
  } else {
    message = item.message;
  }

  return item.newNote
    ? item.newNote?.replace(/<\/?[^>]+(>|$)/g, '')
    : message?.replace(/<\/?[^>]+(>|$)/g, '');
};

export default ChatScreenComponent;
