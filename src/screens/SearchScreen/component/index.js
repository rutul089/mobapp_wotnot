import React, {
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  FlatList,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../../assets/images';
import {
  Header,
  FlexContainer,
  Input,
  Spacing,
  Text,
  ChatItem,
  Loader,
} from '../../../components';
import ConversationList from '../../../components/DashboardTab/ConversationList';
import {CONVERSATION} from '../../../constants/global';
import {goBack, navigate} from '../../../navigator/NavigationUtils';
import {getDayDifference, hp} from '../../../util/helper';
import theme from '../../../util/theme';
import styles from '../Style';
import {
  getGlobalChannelIcon,
  getMessage,
} from '../../../util/ConversationListHelper';

const renderItem = ({item, index}) => {
  return (
    <ChatItem
      key={item?.assignee?.id}
      name={item?.title + ' ' + index}
      email={`${item?.assignee?.name ? item?.assignee?.name + ' | ' : ''}${
        item?.city_name
      },${item?.country_name}`}
      uri={item?.assignee?.image_url}
      isOnline={item?.visitor_status === CONVERSATION.USER_STATUS.ONLINE}
      unreadCount={item?.unread_messages_count}
      lastMessageDay={getDayDifference(item?.last_message_at)}
      subTittle={`${getMessage(item)}`}
      onPress={() => navigate('ConversationScreen', {itemData: item})}
      item={item}
      rating={item?.rating}
      hideRating={item?.status_id === CONVERSATION.OPEN_MESSAGE_TYPE}
      hideUnreadCount={true}
      hideAnimation={true}
      hideStatusIcon={item?.status_id === CONVERSATION.CLOSED_MESSAGE_TYPE}
      paddingHorizontal={theme.sizes.spacing.ph}
      borderBottomWidth={0.5}
      itemData={item}
      channelIcon={getGlobalChannelIcon(
        item?.global_channel_name,
        item?.browser,
      )}
    />
    // <ChatItem
    //   key={item?.assignee?.id}
    //   name={item?.title ?? 'Unknown'}
    //   email={`${item?.assignee?.name} | ${item?.city_name},${item?.country_name}`}
    //   uri={item?.assignee?.image_url}
    //   isOnline={item?.visitor_status === CONVERSATION.USER_STATUS.ONLINE}
    //   unreadCount={item?.unread_messages_count}
    //   lastMessageDay={getDayDifference(item?.last_message_at)}
    //   subTittle={`${item?.message} `}
    //   onPress={() => {
    //     navigate('ConversationScreen', {itemData: item});
    //   }}
    //   item={item}
    //   isClosedMode={true}
    // />
  );
};

const SearchComponent = ({
  onChangeText,
  searchValue,
  rightIconClick,
  onSubmitEditing,
  conversationData,
  isLoading,
  isMoreLoading,
  loadMoreData = () => {},
  onEndReach,
}) => {
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header isRightIconHidden onPressLeftContent={() => goBack()} />
      <Spacing />
      <Input
        containerStyle={{paddingHorizontal: theme.sizes.spacing.ph}}
        computedLeftIcon={images.ic_search}
        rightIcon={images.ic_cross}
        isLeftIconElementVisible
        isRightIconElementVisible
        tintColor={theme.colors.brandColor.blue}
        rightIconStyle={{
          height: theme.sizes.icons.md,
          width: theme.sizes.icons.md,
        }}
        placeholder={'Search'}
        onChangeText={onChangeText}
        value={searchValue}
        leftIconDisabled
        rightIconClick={rightIconClick}
        returnKeyType="done"
        onSubmitEditing={onSubmitEditing && onSubmitEditing}
      />
      <Spacing />
      <FlatList
        data={conversationData}
        extraData={conversationData}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          // paddingHorizontal: theme.sizes.spacing.ph,
        }}
        keyExtractor={(_it, index) => ` ${index} `}
        ListEmptyComponent={
          !isLoading && (
            <View
              style={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No conversation found</Text>
            </View>
          )
        }
        onEndReached={({distanceFromEnd}) => onEndReach(distanceFromEnd)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter(isMoreLoading)}
      />
      <Loader loading={isLoading} />
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
export default SearchComponent;
