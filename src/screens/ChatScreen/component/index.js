import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
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
// import {isValidJSON,getMessage} from '../../../util/JSONOperations';
import {
  getMessage,
  messageParser,
  convertTextMessage,
} from '../../../util/ConversationListHelper';
import {Box} from 'native-base';
import {registerVisitorTypingHandler} from '../../../websocket';

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
  moreLoading,
  loadMoreData = () => {},
  onEndReach,
  isTyping,
}) => {
  const [index, setIndex] = React.useState(0);
  const [typingData, setTypingData] = React.useState();
  const conversation_summary = useSelector(
    state => state.conversationReducer?.conversation_summary?.open_status,
  );
  const close_conversation_count = useSelector(
    state => state.conversationReducer?.closeConversationsCount,
  );
  const tabLabels = ['You', 'Assigned', 'Unassigned', 'Closed'];

  React.useEffect(() => {
    registerVisitorTypingHandler(e => {
      setTypingData(e);
    });
  });

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
      <SafeAreaView flex={1}>
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
                name={item?.title}
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
                subTittle={`${getMessage(item)}`}
                onPress={() => onConversationClick(item)}
                item={item}
                isClosedMode={item?.status_id === 2}
                rating={item?.rating}
                hideRating={currentTab !== CONVERSATION.CLOSE}
                hideUnreadCount={
                  currentTab === CONVERSATION.CLOSE ||
                  item?.unread_messages_count == 0
                }
                hideAnimation={currentTab === CONVERSATION.CLOSE}
                hideStatusIcon={currentTab === CONVERSATION.CLOSE}
                paddingHorizontal={theme.sizes.spacing.ph}
                backgroundColor={'white'}
                duration={80000}
                itemData={item}
                borderBottomWidth={1}
                isLoading={isLoading}
                typingData={typingData}
              />
            )}
            keyExtractor={(_it, index) => `${_it?.thread_key} ${index}`}
            contentContainerStyle={{
              flexGrow: 1,
              // paddingVertical: 5,
              // padding: theme.sizes.spacing.ph,
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
            onEndReached={({distanceFromEnd}) => onEndReach(distanceFromEnd)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter(moreLoading)}
          />
        )}
      </SafeAreaView>
    </FlexContainer>
  );
};

const renderFooter = moreLoading => {
  return moreLoading ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
      }}>
      <ActivityIndicator color={theme.colors.brandColor.blue} />
    </View>
  ) : (
    <></>
  );
};

export default ChatScreenComponent;
