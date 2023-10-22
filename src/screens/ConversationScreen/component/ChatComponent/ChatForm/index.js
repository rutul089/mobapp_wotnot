// Lib
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Text} from '../../../../../components';
import ChatMsgInfo from '../ChatMsgInfo';
import {
  getTimeStamp,
  messageParser,
} from '../../../../../util/ConversationListHelper';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';
import theme from '../../../../../util/theme';

function ChatForm({chatItem, pos}) {
  let msg = JSON.parse(
    chatItem.user
      ? chatItem.user['message']['text']
      : chatItem.agent['message']['text'],
  );
  let titleMsg = msg['message']
    ? msg['message']
    : JSON.parse(chatItem.currentText)['message'];
  let fields = msg['fields'];

  return useMemo(
    () => (
      <View style={chatBubbleStyle.bubbleWrapper}>
        <View style={chatBubbleStyle.bubbleContainer}>
          <Text
            type={'body2'}
            style={chatBubbleStyle.textStyle}
            color={'white'}>
            {messageParser(titleMsg)}
          </Text>
        </View>
        <View
          style={[
            chatBubbleStyle.bubbleContainer,
            {marginTop: 10, flex: 0, padding: 10, maxWidth: '85%'},
          ]}>
          {fields.map((field,index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                marginVertical: 5,
                padding: 5,
                borderRadius: 5,
                minWidth: '85%',
              }}>
              <Text
                type={'body2'}
                numberOfLines={1}
                key={field.label}
                color={theme.colors.clear_blue}
                style={{marginVertical: 5}}>
                {field.label}{' : '}
              </Text>
              {field.value ? (
                <Text
                  type={'body2'}
                  style={{marginVertical: 5,flex:1}}
                  color={theme.colors.charcoal_grey}>
                  {field.value}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
        <ChatMsgInfo
          timeStampRight
          time={
            getTimeStamp(
              chatItem.user
                ? chatItem.user.timestamp
                : chatItem.agent.timestamp,
            ).timestamp
          }
          userData={chatItem}
        />
      </View>
    ),
    [chatItem, chatItem.currentText, pos],
  );
}

export default ChatForm;
