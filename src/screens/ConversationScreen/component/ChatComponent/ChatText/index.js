import {Button, HStack as Row, VStack as Col} from 'native-base';
import React, {useMemo} from 'react';
import {Linking, View} from 'react-native';
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

function ChatText(props) {
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

  const getTextMessage = msg => {
    let data = isValidJSON(msg) ? JSON.parse(msg) : null;
    if (data.type === 'text') {
      return (
        <Row style={{position: pos}}>
          <Col style={msgContainer(true)}>
            <View style={{...sendMsgBorder}}>
              <Text style={{...sendMsg, ...msg}}>
                {data.text.replace(REGEX_PATTERNS.HTML_TAGS, '')}
              </Text>
            </View>
            <ChatMsgInfo
              timeStampRight
              time={getTimeStamp(chatItem.agent.timestamp).timestamp}
              userData={chatItem}
            />
          </Col>
        </Row>
      );
    } else {
      return null;
    }
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
        if (data.type === 'text') {
          template = (
            <ChatBubbleAgent
              timestamp={getTimeStamp(chatItem.agent.timestamp).timestamp}
              timeStampRight
              chatItem={chatItem}
              msg={data.text.replace(REGEX_PATTERNS.HTML_TAGS, '')}
              isUser
            />
            //   <Row style={{position: pos, flex: 1}}>
            //   <Col style={msgContainer(true)}>
            //     <View >
            //       <Text style={{...sendMsg, ...msg}}>
            //         {data.text.replace(REGEX_PATTERNS.HTML_TAGS, '')}
            //       </Text>
            //     </View>
            //     <ChatMsgInfo
            //       timeStampRight
            //       time={getTimeStamp(chatItem.agent.timestamp).timestamp}
            //       userData={chatItem}
            //     />
            //   </Col>
            // </Row>
          );
        } else {
          let fileItem = data.video
            ? data.video
            : data.document
            ? data.document
            : data.audio
            ? data.audio
            : null;
          if (fileItem) {
            let ext = getFileExtension(fileItem?.file_name);
            template = (
              <View style={chatBubbleStyle.bubbleWrapper}>
                <View style={chatBubbleStyle.bubbleContainer}>
                  <FileItemRow
                    fileName={`${fileItem.file_name}`}
                    ext={getExtensionIcon(ext)}
                  />
                </View>
                <ChatMsgInfo
                  timeStampRight
                  time={getTimeStamp(chatItem.agent.timestamp).timestamp}
                  userData={chatItem}
                />
              </View>
            );
          }
        }
        return template;
      } else {
        return convertTextMessage(chatItem.agent.message.text) ? (
          <View style={{flex: 1}}>
            {REGEX_PATTERNS.ANCHER_TAG.test(
              convertTextMessage(chatItem.agent.message),
            ) ? (
              <Button
                style={{...linkButton}}
                onPress={() =>
                  Linking.openURL(
                    convertTextMessage(chatItem.agent.message).match(
                      REGEX_PATTERNS.ANCHER_TAG,
                    )[1],
                  )
                }>
                <Text style={{...sendMsg, ...msg, ...clickableMsg}}>
                  {messageParser(convertTextMessage(chatItem.agent.message))}
                </Text>
              </Button>
            ) : (
              <ChatBubbleAgent
                timestamp={
                  getTimeStamp(
                    messageParser(convertTextMessage(chatItem.agent.timestamp)),
                  ).timestamp
                }
                timeStampRight
                chatItem={chatItem}
                msg={messageParser(convertTextMessage(chatItem.agent.message))}
                isUser
                chatUserName={chatUserName}
              />
            )}
          </View>
        ) : null;
      }
    } else if (chatItem.user) {
      if (
        chatItem.user.message &&
        chatItem.user.message.version &&
        chatItem.user.message.version === 2
      ) {
        return (
          <Row style={{position: pos}}>
            <Col style={{...msgContainer()}}>
              <View style={{...receiveMsgBorder}}>
                <Text style={{...msg, ...receiveMsg}}>
                  {getTextMessage(chatItem.user.message.text)}
                </Text>
              </View>
              <ChatMsgInfo
                time={getTimeStamp(chatItem.user.timestamp).timestamp}
                userData={chatItem}
              />
            </Col>
          </Row>
        );
      } else {
        return typeof stringToObj(chatItem.user.message.text) === 'object' &&
          !props.textMsg ? (
          <View />
        ) : //   <ChatImg
        //     chatItem={chatItem}
        //     onToggleImageModal={onToggleImageModal}
        //   />
        convertTextMessage(chatItem.user.message.text) ? (
          <View style={{flex: 1}}>
            <View style={{...receiveMsgBorder}}>
              {REGEX_PATTERNS.ANCHER_TAG.test(
                convertTextMessage(chatItem.user.message.text),
              ) ? (
                <Button
                  style={{...linkButton}}
                  onPress={() =>
                    Linking.openURL(
                      chatItem.user.message.text.match(
                        REGEX_PATTERNS.ANCHER_TAG,
                      )[1],
                    )
                  }>
                  <Text style={{...msg, ...receiveMsg, ...clickableMsg}}>
                    {chatItem.user.message.text}
                  </Text>
                </Button>
              ) : (
                <ChatBubbleAgent
                  timestamp={getTimeStamp(chatItem.user.timestamp).timestamp}
                  timeStampRight
                  chatItem={chatItem}
                  msg={
                    props.textMsg
                      ? props.textMsg.text
                      : typeof stringToObj(chatItem.user.message.text) ===
                          'object' && isValidJSON(chatItem.user.message.text)
                      ? stringToObj(chatItem.user.message.text).text
                      : chatItem.user.message.text
                  }
                  isUser={false}
                  chatUserName={chatUserName}
                />
              )}
            </View>
            {/* <ChatMsgInfo
              time={getTimeStamp(chatItem.user.timestamp).timestamp}
              userData={chatItem}
            /> */}
          </View>
        ) : null;
      }
    }
  };

  return useMemo(() => getMessageTemplate(), [chatItem, pos]);
}

export default ChatText;
