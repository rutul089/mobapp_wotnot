import React, {
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

const renderItem = ({item}) => {
  return (
    <ChatItem
      key={item?.assignee?.id}
      name={item?.title ?? 'Unknown'}
      email={`${item?.assignee?.name} | ${item?.city_name},${item?.country_name}`}
      uri={item?.assignee?.image_url}
      isOnline={item?.visitor_status === CONVERSATION.USER_STATUS.ONLINE}
      unreadCount={item?.unread_messages_count}
      lastMessageDay={getDayDifference(item?.last_message_at)}
      subTittle={`${item?.message} `}
      onPress={() => {
        navigate('ConversationScreen', {itemData: item});
      }}
      item={item}
      isClosedMode={true}
    />
  );
};

const SearchComponent = ({
  onChangeText,
  searchValue,
  rightIconClick,
  onSubmitEditing,
  conversationData,
  isLoading,
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
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: theme.sizes.spacing.ph,
        }}
        keyExtractor={_it => `${_it?.thread_key}`}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={state.isRefreshing}
        //     onRefresh={_getConversationsAPI}
        //     tintColor={colors.brandColor.blue}
        //   />
        // }
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
      />
      {/* <View style={styles.searchViewContainer}>
        <Header isRightIconHidden onPressLeftContent={() => goBack()} />
        <View style={styles.searchViewInnerContainer}>
          <View style={styles.searchBarContainer}>
            <TouchableWithoutFeedback>
              <Image
                source={images.ic_search}
                style={{height: hp(3), width: hp(3)}}
                tintColor={colors.brandColor.blue}
              />
            </TouchableWithoutFeedback>
            <TextInput
              style={[styles.textInputStyle]}
              placeholder="Search here...."
              value={searchQuery}
              onChangeText={_text =>
                updateSearchQuery(prev => ({...prev, searchQuery: _text}))
              }
            />
          </View>
          <ConversationList searchQuery={searchQuery} isSearchView={true} />
        </View>
      </View> */}
      <Loader loading={isLoading} />
    </FlexContainer>
  );
};
export default SearchComponent;
