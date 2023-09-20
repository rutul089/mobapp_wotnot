// Lib
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {Row, Col} from 'native-base';
import {Text} from '../../../../../components';
import ChatMsgInfo from '../ChatMsgInfo';
import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';

function ChatSlider({chatItem, pos}) {
  let msg = JSON.parse(chatItem.agent.message.text);
  return useMemo(
    () => (
      <View style={chatBubbleStyle.bubbleWrapper}>
        <View style={chatBubbleStyle.bubbleContainer}>
          {/* <Text
            type={'body2'}
            style={chatBubbleStyle.textStyle}
            color={'white'}>
            Type: Select Range
          </Text> */}
          <Text
            type={'body2'}
            style={chatBubbleStyle.textStyle}
            color={'white'}>
            {msg.message}
          </Text>
          {/* <Text
            type={'body2'}
            style={chatBubbleStyle.textStyle}
            color={'white'}>
            Type Value between {msg.min} to {msg.max}.
          </Text> */}
        </View>
        <ChatMsgInfo
          timeStampRight
          time={getTimeStamp(chatItem.agent.timestamp).timestamp}
          userData={chatItem}
        />
      </View>
    ),
    [chatItem, pos],
  );
}

export default ChatSlider;
