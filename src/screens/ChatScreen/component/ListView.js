import React from 'react';
import {Text, FlatList} from 'react-native';
import {ChatItem} from '../../../components';
import {getDayDifference} from '../../../util/helper';
import {getMessage} from '../../../util/ConversationListHelper';
import {CONVERSATION} from '../../../constants/global';
import theme from '../../../util/theme';
import {View} from 'native-base';

const ListView = ({
  data,
  onConversationClick,
  currentTab,
  isLoading,
  typingData,
}) => (
  <>
    <View style={{flex:1}}>
      <FlatList
        data={data}
            initialNumToRender={25}
        renderItem={({item, index}) => (
          <ChatItem
            key={item?.assignee?.id}
            name={item?.title}
            email={`${
              item?.assignee?.name ? item?.assignee?.name + ' | ' : ''
            }${item?.city_name},${item?.country_name}`}
            uri={item?.assignee?.image_url}
            isOnline={item?.visitor_status === CONVERSATION.USER_STATUS.ONLINE}
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
      />
    </View>
  </>
);

export default ListView;
