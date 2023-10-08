import React, {useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {getUserAcronym} from '../../../../../util/ChatHistoryHelper';
import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {isValidJSON, stringToObj} from '../../../../../util/JSONOperations';
import {VALIDATION_REGEX as REGEX_PATTERNS} from '../../../../../util/helper';
import theme from '../../../../../util/theme';
import ChatMsgInfo from '../ChatMsgInfo';
import {styles as bubbleStyle} from '../ChatStyle/chatBubbleStyle';
import VisitorIcon from '../VisitorIcon';
import {chatImgStyles} from './ChatImg.style';
import {ImageViewer} from '../../../../../components';

function ChatImgComponent(props) {
  const {chatItem, onToggleImageModal, pos, chatUserName, isHideAvatar} = props;

  const {msgContainer, imgContainer, imgSize} = chatImgStyles();

  const [isVisible, setVisible] = React.useState(false);
  const [imgLink, setImgLink] = React.useState('');

  let imgSrc = null;

  const getVersion = () => {
    let v = null;
    if (chatItem.agent) {
      if (chatItem.agent.message && chatItem.agent.message.version) {
        v = chatItem.agent.message.version;
      }
    } else if (chatItem.user) {
      if (chatItem.user.message && chatItem.user.message.version) {
        v = chatItem.user.message.version;
      }
    }

    return v;
  };

  let version = getVersion();

  if (version && version === 2) {
    let imgItem = chatItem.agent
      ? chatItem.agent
      : chatItem.auto_reply
      ? chatItem.auto_reply
      : chatItem.user
      ? chatItem.user
      : null;
    let data = isValidJSON(imgItem.message.text)
      ? JSON.parse(imgItem.message.text)
      : null;
    if (data && data.type === 'image' && data.image.link) {
      imgSrc = data.image.link;
    }
  } else {
    let imgItem = chatItem.agent
      ? chatItem.agent
      : chatItem.auto_reply
      ? chatItem.auto_reply
      : chatItem.user
      ? chatItem.user
      : null;
    let imgItemType = imgItem.type
      ? imgItem.type
      : imgItem.message
      ? imgItem.message.type
      : null;
    if (imgItemType === 'text') {
      let getFiles = isValidJSON(imgItem.message.text)
        ? JSON.parse(imgItem.message.text)
        : null;
      imgSrc = imgItem.message.text.match(REGEX_PATTERNS.IMAGE_SRC)
        ? imgItem.message.text.match(REGEX_PATTERNS.IMAGE_SRC)[1]
        : getFiles &&
          getFiles.hasOwnProperty('files') &&
          getFiles.files[props.fileIndex ? props.fileIndex : 0].link
        ? getFiles.files[props.fileIndex ? props.fileIndex : 0].link
        : '';
    } else {
      imgSrc =
        isValidJSON(imgItem.message.text) &&
        stringToObj(imgItem.message.text).files[
          props.fileIndex ? props.fileIndex : 0
        ]
          ? stringToObj(imgItem.message.text).files[
              props.fileIndex ? props.fileIndex : 0
            ].link
          : imgItem.message.imgSrc;
    }
  }

  function onImagePress() {
    onToggleImageModal(imgSrc);
  }

  return useMemo(
    () =>
      imgSrc ? (
        chatItem.agent ? (
          <>
            <View style={bubbleStyle.bubbleWrapper}>
              <View style={bubbleStyle.bubbleContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{padding: 10, ...imgContainer('send')}}
                  onPress={onImagePress}>
                  <View style={imgSize('100%')}>
                    <View style={{...imgSize()}}>
                      <Image
                        source={
                          typeof imgSrc !== 'string' ? imgSrc : {uri: imgSrc}
                        }
                        resizeMode={'cover'}
                        style={{...imgSize('100%')}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <ChatMsgInfo
                timeStampRight
                time={getTimeStamp(chatItem.agent.timestamp).timestamp}
                userData={chatItem}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{flexDirection: 'row'}}
              onPress={() => onToggleImageModal(imgSrc)}>
              {!isHideAvatar ? (
                <VisitorIcon
                  chatItem={chatItem}
                  chatUserName={chatUserName}
                  acronymValue={getUserAcronym(chatUserName)}
                />
              ) : null}
              <View
                style={[
                  bubbleStyle.bubbleWrapper,
                  {alignItems: 'flex-start', marginLeft: theme.normalize(8)},
                ]}>
                <View style={bubbleStyle.bubbleContainerVisitor}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{padding: 10, ...imgContainer('send')}}
                    onPress={onImagePress}>
                    <View style={imgSize('100%')}>
                      <View style={{...imgSize()}}>
                        <Image
                          source={
                            typeof imgSrc !== 'string' ? imgSrc : {uri: imgSrc}
                          }
                          resizeMode={'cover'}
                          style={{...imgSize('100%')}}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <ChatMsgInfo
                  time={getTimeStamp(chatItem.user.timestamp).timestamp}
                  userData={chatItem}
                />
              </View>
            </View>
          </>
        )
      ) : null,
    [chatItem, pos, imgSrc],
  );
}

export default ChatImgComponent;
