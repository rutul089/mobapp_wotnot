// Lib
import React, {useMemo} from 'react';
import {
  TouchableHighlight,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import ChatMsgInfo from '../ChatMsgInfo';
import {Text} from '../../../../../components';
import {
  getTimeStamp,
  messageParser,
} from '../../../../../util/ConversationListHelper';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';
import FileItemRow from '../FileItemRow';
import {
  getChatMsgType,
  getExtensionIcon,
  getFileExtension,
} from '../../../../../util/ChatHistoryHelper';

function ChatListView({chatItem, pos, retainButtonListUponSelection}) {
  return useMemo(
    () => (
      <View style={chatBubbleStyle.bubbleWrapper}>
        <View style={[chatBubbleStyle.bubbleContainer]}>
          {chatItem?.agent?.message?.header?.text ? (
            <Text
              type={'body2'}
              style={chatBubbleStyle.textStyle}
              color={'white'}>
              {messageParser(chatItem?.agent?.message?.header?.text)}
            </Text>
          ) : null}
          {chatItem?.agent?.message?.title ? (
            <Text
              type={'body2'}
              style={chatBubbleStyle.textStyle}
              color={'white'}>
              {messageParser(chatItem.agent.message.title)}
            </Text>
          ) : null}
          {chatItem?.agent?.message?.footer ? (
            <Text
              type={'body2'}
              style={chatBubbleStyle.textStyle}
              color={'white'}>
              {messageParser(chatItem.agent.message.footer)}
            </Text>
          ) : null}
        </View>
        {chatItem?.agent?.message.list?.sections && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              flex: 0,
              borderTopRightRadius: 2,
              maxWidth: '95%',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
            {chatItem.agent.message.list?.sections?.[0]?.items?.slice(0, 10).map(btn => (
              <TouchableOpacity
                disabled
                key={String(btn.id + '-' + btn.title)}
                style={{
                  marginVertical: 5,
                  marginRight: 5,
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: '#e8e9ef',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  alignItems: 'center',
                }}>
                <Text type={'caption12'}>{btn.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {chatItem?.agent?.timestamp ? (
          <ChatMsgInfo
            timeStampRight
            time={getTimeStamp(chatItem?.agent?.timestamp).timestamp}
            userData={chatItem}
          />
        ) : null}
      </View>
    ),
    [chatItem, pos],
  );
}

export default ChatListView;
