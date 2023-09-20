/* eslint-disable prettier/prettier */
//  Lib
import React, {useMemo} from 'react';
import {Row, Col} from 'native-base';
import {View, TouchableOpacity, Image} from 'react-native';

// Style and Images
import {chatImgStyles} from './ChatImg.style';
import {isValidJSON, stringToObj} from '../../../../../util/JSONOperations';
import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {VALIDATION_REGEX as REGEX_PATTERNS} from '../../../../../util/helper';
import images from '../../../../../assets/images';

function ChatImgComponent(props) {
  const {chatItem, onToggleImageModal, pos} = props;

  const {msgContainer, imgContainer, imgSize} = chatImgStyles();

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
    onToggleImageModal && onToggleImageModal(imgSrc);
  }

  return useMemo(
    () =>
      imgSrc ? (
        chatItem.agent ? (
          <View style={{height: 50, backgroundColor: 'red'}} />
        ) : (
          // <Row style={{position: pos}}>
          //   <Col style={{...msgContainer(true)}}>
          //     <TouchableOpacity
          //       style={{...imgContainer('send')}}
          //       onPress={onImagePress && onImagePress}>
          //       <View style={imgSize('100%')}>
          //         <View style={{...imgSize()}}>
          //           <Image
          //             source={
          //               typeof imgSrc !== 'string' ? imgSrc : {uri: imgSrc}
          //             }
          //             resizeMode={'cover'}
          //             style={{...imgSize('100%')}}
          //           />
          //         </View>
          //       </View>
          //     </TouchableOpacity>
          //     {/* <ChatMsgInfo
          //       timeStampRight
          //       time={getTimeStamp(chatItem.agent.timestamp).timestamp}
          //       userData={chatItem}
          //     />  */}
          //   </Col>
          // </Row>
          <View style={{height: 50, backgroundColor: 'blue'}} />

          // <Row style={{position: pos}}>
          //   <Col style={{alignItems: 'flex-start', marginVertical: 10}}>
          //     {/* <TouchableOpacity
          //       style={{...imgContainer(), ...imgSize()}}
          //       onPress={onImagePress}>
          //       <View style={imgSize('100%')}>
          //         <Image
          //           defaultSource={images.ic_userprofile}
          //           source={typeof imgSrc !== 'string' ? imgSrc : {uri: imgSrc}}
          //           resizeMode={'cover'}
          //           style={imgSize('100%')}
          //         />
          //       </View>
          //     </TouchableOpacity> */}
          //     {/* <ChatMsgInfo
          //       time={getTimeStamp(chatItem.user.timestamp).timestamp}
          //       userData={chatItem}
          //     /> */}
          //   </Col>
          // </Row>
        )
      ) : (
        <View style={{height: 50, backgroundColor: 'green'}} />
      ),
    [chatItem, pos],
  );
}

export default ChatImgComponent;
