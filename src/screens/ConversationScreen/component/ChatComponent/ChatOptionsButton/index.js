// Lib
import React, {useMemo} from 'react';
import {TouchableHighlight, View, TouchableOpacity} from 'react-native';
import ChatMsgInfo from '../ChatMsgInfo';
import {Text} from '../../../../../components';
import {
  getTimeStamp,
  messageParser,
} from '../../../../../util/ConversationListHelper';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';

function ChatOptionsButton({chatItem, pos, retainButtonListUponSelection}) {
  //   const {
  //     msgContainer,
  //     optionsWrapper,
  //     optionButton,
  //     buttonText,
  //     receiveMsgBorder,
  //     typeText,
  //     title,
  //   } = chatOptionsButtonStyles(retainButtonListUponSelection);
  return useMemo(
    () => (
      <View style={chatBubbleStyle.bubbleWrapper}>
        <View style={[chatBubbleStyle.bubbleContainer]}>
          <Text
            type={'body2'}
            style={chatBubbleStyle.textStyle}
            color={'white'}>
            {messageParser(chatItem.agent.message.text)}
          </Text>
        </View>
        {/* <View
          style={[
            chatBubbleStyle.bubbleContainer,
            {backgroundColor: '#e8e9ef'},
          ]}>
          <View
            style={{
              padding: 10,
              maxWidth: '80%',
              //   borderTopLeftRadius: 2,
              //   borderBottomLeftRadius: 7,
              //   borderTopRightRadius: 7,
              //   borderBottomRightRadius: 7,
              borderRadius: 10,
              borderTopRightRadius: 2,
              overflow: 'hidden',
              backgroundColor: '#e8e9ef',
              flex: 0,
            }}>
            <Text type={'body2'}>Type: Button</Text>
            <Text type={'body2'}>
              {messageParser(chatItem.agent.message.text)}
            </Text>
          </View>
        </View> */}
        {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            flex: 0,
            borderTopRightRadius: 2,
            maxWidth: '70%',
            justifyContent: 'flex-end',
            marginTop: 10,
          }}>
          {chatItem.agent.message.options.map(btn => (
            <TouchableOpacity
              key={String(btn.id + '-' + btn.text)}
              style={{
                marginVertical: 5,
                marginRight: 5,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: '#e8e9ef',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}>
              <Text type={'caption12'} color={'black'}>
                {btn.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
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

export default ChatOptionsButton;
