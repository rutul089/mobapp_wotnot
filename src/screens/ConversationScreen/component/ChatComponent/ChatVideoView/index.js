import React, {useMemo, useState} from 'react';
import {Linking, Pressable, View} from 'react-native';
import {chatTextStyles} from './ChatText.style';
import {
  checkMessageContentType,
  getExtensionIcon,
  getFileExtension,
} from '../../../../../util/ChatHistoryHelper';
import {
  getTimeStamp,
  messageParser,
} from '../../../../../util/ConversationListHelper';
import {isValidJSON, stringToObj} from '../../../../../util/JSONOperations';
import {Text} from '../../../../../components';
import {VALIDATION_REGEX as REGEX_PATTERNS} from '../../../../../util/helper';
import ChatMsgInfo from '../ChatMsgInfo';
import ChatBubbleAgent from '../../ChatBubbleAgent';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';
import FileItemRow from '../FileItemRow';
import Video from 'react-native-video';
import theme from '../../../../../util/theme/';

import {navigate} from '../../../../../navigator/NavigationUtils';

function ChatVideoView(props) {
  const {chatItem, pos, onToggleImageModal, chatUserName} = props;
  const {
    msg,
    sendMsg,
    receiveMsg,
    sendMsgBorder,
    receiveMsgBorder,
    msgContainer,
    clickableMsg,
    linkButton,
  } = chatTextStyles();

  const convertTextMessage = msg => {
    let message =
      msg.type === 'text'
        ? checkMessageContentType(msg.text ? msg.text : msg)
        : msg.text
        ? msg.text
        : msg;
    if (msg.type === 'file') {
      message = JSON.parse(message).message;
    } else {
      try {
        message = JSON.parse(msg);
        message =
          message.type === 'slider.response'
            ? message.text
            : message.type === 'file.response'
            ? message.files[0]
            : message.message
            ? message.message
            : checkMessageContentType(message);
      } catch (err) {
        // print error
      }
    }
    return message;
  };

  const getMessageTemplate = () => {
    if (chatItem.agent) {
      if (
        chatItem.agent.message &&
        chatItem.agent.message.version &&
        chatItem.agent.message.version === 2
      ) {
        let template = null;
        let data = isValidJSON(chatItem.agent.message.text)
          ? JSON.parse(chatItem.agent.message.text)
          : null;

        let fileItem = data.video ? data.video : data.audio ? data.audio : null;
        if (fileItem) {
          let ext = getFileExtension(fileItem?.file_name);
          template = (
            <View style={chatBubbleStyle.bubbleWrapper}>
              <Pressable
                onPress={() =>
                  navigate('VideoPlayer', {itemData: fileItem.link})
                }
                style={[
                  chatBubbleStyle.bubbleContainerVisitor,
                  {
                    padding: 10,
                  },
                ]}>
                <Video
                  resizeMode={'contain'}
                  source={{
                    uri: fileItem.link,
                  }}
                  style={{
                    height: theme.normalize(150),
                    width: theme.normalize(200),
                  }}
                  controls={false}
                  paused={false}
                  repeat={false}
                  fullscreen={false}
                />

                {/* <FileItemRow
                  fileName={`${fileItem.file_name}`}
                  ext={getExtensionIcon(ext)}
                  onFileClick={() => Linking.openURL(fileItem.link)}
                /> */}
              </Pressable>
              <ChatMsgInfo
                timeStampRight
                time={getTimeStamp(chatItem.agent.timestamp).timestamp}
                userData={chatItem}
              />
            </View>
          );
        }
        return template;
      } else {
        null;
      }
    } else if (chatItem.user) {
      if (
        chatItem.user.message &&
        chatItem.user.message.version &&
        chatItem.user.message.version === 2
      ) {
        return null;
      } else {
        null;
      }
    }
  };

  return useMemo(() => getMessageTemplate(), [chatItem, pos]);
}

export default ChatVideoView;
