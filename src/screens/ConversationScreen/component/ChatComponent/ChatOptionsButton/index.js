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

function ChatOptionsButton({chatItem, pos, retainButtonListUponSelection,isList}) {
  renderHeader = data => {
    let ext = getFileExtension(data?.document?.filename);
    return (
      <FileItemRow
        fileName={`${data?.document?.filename}`}
        ext={getExtensionIcon(ext)}
        style={{backgroundColor: '#F7F7F7', margin: 10, borderRadius: 10}}
        tintColor="black"
        iconTintColor="black"
        numberOfLines={1}
        onFileClick={() => Linking.openURL(data?.document?.link)}
      />
    );
  };

  renderFooter = data => {
    return (
      <Text type={'body2'} style={chatBubbleStyle.textStyle} color={'white'}>
        {messageParser(data)}
      </Text>
    );
  };
  return useMemo(
    () => (
      <View style={chatBubbleStyle.bubbleWrapper}>
        <View style={[chatBubbleStyle.bubbleContainer]}>
          {chatItem?.agent?.message?.header?.type === 'document'
            ? renderHeader(chatItem?.agent?.message?.header)
            : null}
          {chatItem?.agent?.message?.text ? (
            <Text
              type={'body2'}
              style={chatBubbleStyle.textStyle}
              color={'white'}>
              {messageParser(chatItem.agent.message.text)}
            </Text>
          ) : null}
          {chatItem?.agent?.message?.footer
            ? renderFooter(chatItem?.agent?.message?.footer)
            : null}
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
        {chatItem?.agent?.message.options && (
          <View
            style={{
              flexDirection:
                chatItem?.agent?.message?.buttons_layout === 'vertical'
                  ? 'column'
                  : 'row',
              flexWrap:
                chatItem?.agent?.message?.buttons_layout === 'vertical'
                  ? 'nowrap'
                  : 'wrap',
              flex: 0,
              borderTopRightRadius: 2,
              maxWidth: '95%',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
            {chatItem.agent.message.options.slice(0, 10).map(btn => (
              <TouchableOpacity
                disabled
                key={String(btn.id + '-' + btn.text)}
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
                <Text type={'caption12'}>{btn.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {chatItem?.agent?.message?.text ? (
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

export default ChatOptionsButton;
