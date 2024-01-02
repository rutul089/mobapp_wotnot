//Lib
import React, { useMemo } from 'react';
import { Image, Linking, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../../../components';
import {
  isTextComponentContainImage,
  isValidHttpUrl,
} from '../../../../../util/ChatHistoryHelper';
import {
  getTimeStamp,
  unEscape,
} from '../../../../../util/ConversationListHelper';
import { VALIDATION_REGEX as REGEX_PATTERNS } from '../../../../../util/helper';
import theme from '../../../../../util/theme';
import { chatImgStyles } from '../ChatImg/ChatImg.style';
import ChatMsgInfo from '../ChatMsgInfo';
import { styles as chatBubbleStyle } from '../ChatStyle/chatBubbleStyle';

function ChatNote(props) {
  const {imgContainer, imgSize} = chatImgStyles();
  console.log('unEscape(props.textMsg)', unEscape(props.textMsg));
  return useMemo(
    () => (
      <View style={chatBubbleStyle.bubbleWrapper}>
        <View
          style={[
            chatBubbleStyle.bubbleContainer,
            {backgroundColor: theme.colors.yellow},
          ]}>
          {isTextComponentContainImage(props.textMsg) ? (
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 10, ...imgContainer('send')}}
                onPress={() =>
                  props.onToggleImageModal &&
                  props.onToggleImageModal(
                    props.textMsg.match(REGEX_PATTERNS.IMAGE_SRC)[1],
                  )
                }>
                <View style={imgSize('100%')}>
                  <View style={{...imgSize()}}>
                    <Image
                      source={{
                        uri: props.textMsg.match(REGEX_PATTERNS.IMAGE_SRC)[1],
                      }}
                      resizeMode={'cover'}
                      style={{...imgSize('100%')}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                maxWidth: '80%',
              }}>
              {isValidHttpUrl(props.textMsg) ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    Linking.openURL(
                      props.textMsg.replace(REGEX_PATTERNS.HTML_TAGS, ''),
                    )
                  }>
                  <Text
                    type={'body2'}
                    style={[
                      chatBubbleStyle.textStyle,
                      {textDecorationLine: 'underline'},
                    ]}
                    color={'white'}>
                    {props.textMsg.replace(REGEX_PATTERNS.HTML_TAGS, '')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text
                  type={'body2'}
                  // style={chatBubbleStyle.textStyle}
                  color={'white'}>
                  {props.textMsg.replace(REGEX_PATTERNS.HTML_TAGS, '')}
                </Text>
              )}
            </View>
          )}
        </View>
        <ChatMsgInfo
          timeStampRight
          time={getTimeStamp(props.chatItem.agent.timestamp).timestamp}
          userData={props.chatItem}
        />
      </View>
    ),
    [props],
  );
}

export default ChatNote;
