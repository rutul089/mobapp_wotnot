//Lib
import React, {useMemo} from 'react';
import {View, Image, TouchableOpacity, Linking} from 'react-native';
import {Button, Col, Row} from 'native-base';
import ChatMsgInfo from '../ChatMsgInfo';
import {Text} from '../../../../../components';
import {VALIDATION_REGEX as REGEX_PATTERNS} from '../../../../../util/helper';
import {chatImgStyles} from '../ChatImg/ChatImg.style';
import {chatTextStyles} from '../ChatText/ChatText.style';
import {backgroundColor} from '~/assets/styles/_partials/_backgroundColor';
import {
  isValidHttpUrl,
  isTextComponentContainImage,
} from '../../../../../util/ChatHistoryHelper';
import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';
import theme from '../../../../../util/theme';

function ChatNote(props) {
  const {imgContainer, imgSize} = chatImgStyles();

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
              {/* <TouchableHighlight
                defaultSource={require('~/assets/images/fallback_image.png')}
                style={imgSize('100%')}
                onPress={() =>
                  props.onToggleImageModal(
                    props.textMsg.match(REGEX_PATTERNS.IMAGE_SRC)[1],
                  )
                }>
                <View style={{...imgSize()}}>
                  <Image
                    source={{
                      uri: props.textMsg.match(REGEX_PATTERNS.IMAGE_SRC)[1],
                    }}
                    resizeMode={'cover'}
                    style={{...imgSize('100%')}}
                  />
                </View>
              </TouchableHighlight> */}
            </View>
          ) : (
            <View>
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
                  style={chatBubbleStyle.textStyle}
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
