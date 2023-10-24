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
  getAssigneeName,
  getGlobalChannelIcon,
  getMessage,
  unEscape,
} from '../../../util/ConversationListHelper';
import {strings} from '../../../locales/i18n';

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
  moreLoading,
  users,
}) => {
  const getFullMessage = item => {
    return item?.message === ''
      ? unEscape(item?.note)
      : ` ${getAssigneeName(users, item?.last_message_by)}${getMessage(item)}`;
  };
  const getAddress = item => {
    let text = '';
    if (item?.assignee?.name) {
      text = item?.assignee?.name;
    }

    if (
      item?.assignee?.name &&
      item?.global_channel_name?.toLowerCase() === 'web'
    ) {
      text = text + ' | ';
    }

    if (item?.city_name) {
      text = text + item?.city_name;
    }

    if (item?.country_name && item?.city_name) {
      return (text = text + ',' + item?.country_name);
    }

    if (item?.country_name) {
      return (text = text + item?.country_name);
    }
    return text;
  };
  const renderItem = ({item, index}) => {
    return (
      <ChatItem
        key={item?.assignee?.id}
        name={item?.title + ' ' + index}
        email={getAddress(item)}
        uri={item?.assignee?.image_url}
        isOnline={item?.visitor_status === CONVERSATION.USER_STATUS.ONLINE}
        unreadCount={item?.unread_messages_count}
        lastMessageDay={getDayDifference(item?.last_message_at)}
        subTittle={`${getFullMessage(item)}`}
        onPress={() => navigate('ConversationScreen', {itemData: item})}
        item={item}
        rating={item?.rating}
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
        hideSlaErr={true}
        hideRating={
          item?.status_id === CONVERSATION.OPEN_MESSAGE_TYPE ||
          item?.global_channel_name !== 'Web' ||
          item?.rating === 0
        }
      />
    );
  };
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
        placeholder={strings('SEARCH_PLACEHOLDER')}
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
              <Text>{strings('No conversation found')}</Text>
            </View>
          )
        }
        onEndReached={({distanceFromEnd}) => onEndReach(distanceFromEnd)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ moreLoading ? renderFooter(true) : null}
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
        height: 90,
      }}>
      <ActivityIndicator color={theme.colors.brandColor.blue} />
    </View>
  ) : (
    <></>
  );
};
export default SearchComponent;
