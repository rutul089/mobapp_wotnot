//  Lib
import React, {useMemo} from 'react';
// import * as FileSystem from 'expo-file-system';
// import * as Linking from 'expo-linking';
// import * as IntentLauncher from 'expo-intent-launcher';
import {View, Linking,Platform} from 'react-native';
import {
  getExtensionIcon,
  getFileExtension,
  getFileName,
} from '../../../../../util/ChatHistoryHelper';
import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {stringToObj} from '../../../../../util/JSONOperations';
import ChatBubbleAgent from '../../ChatBubbleAgent';
import ChatMsgInfo from '../ChatMsgInfo';
import FileItemRow from '../FileItemRow';
import {chatFileStyles} from './ChatFileBlock.style';

function ChatFileBlock(props) {
  const {chatItem, pos, chatUserName} = props;
  const text = chatItem.agent
    ? stringToObj(chatItem.agent.message.text).files[props.fileIndex]
    : stringToObj(chatItem.user.message.text).files[props.fileIndex];
  const {link} = text;
  const fileName = getFileName(text.filename);
  const ext = getFileExtension(text.filename);
  const {msgContainer, fileContainer, fileBlock} = chatFileStyles();

  let cUri = link;
  const showFile = () => {
    console.log('-------')
    Platform.OS === 'ios'
      ? Linking.canOpenURL(cUri).then(supported => {
        console.log('supported',supported)
          supported ? Linking.openURL(cUri) : null;
        })
      : null;
    // FileSystem.downloadAsync(
    //   link,
    //   FileSystem.documentDirectory + fileName,
    // ).then(({uri}) => {
    //   FileSystem.getContentUriAsync(uri).then(cUri => {
    //     IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
    //       data: cUri,
    //       flags: 1,
    //     });
    //   });
    // });
  };
  return useMemo(
    () => (
      <View style={{flex: 0}}>
        {chatItem.agent ? (
          <ChatMsgInfo
            timeStampRight
            time={getTimeStamp(chatItem.agent.timestamp).timestamp}
            userData={chatItem}
          />
        ) : (
          <ChatBubbleAgent
            timestamp={getTimeStamp(chatItem.user.timestamp).timestamp}
            timeStampRight
            chatItem={chatItem}
            // msg={`${fileName}.${ext}`}
            isUser={false}
            chatUserName={chatUserName}
            userFileJSX={
              <FileItemRow
                fileName={`${fileName}.${ext}`}
                tintColor={'black'}
                iconTintColor={'black'}
                ext={getExtensionIcon(ext)}
                onFileClick={showFile}
              />
            }
          />
          // <View style={{marginBottom:5}}>
          //   <View
          //     style={[
          //       chatBubbleStyle.bubbleWrapper,
          //       {alignItems: 'flex-start', marginLeft: theme.normalize(8),marginBottom:0},
          //     ]}>
          //     <View style={chatBubbleStyle.bubbleContainerVisitor}>
          //       <FileItemRow
          //         fileName={`${fileName}.${ext}`}
          //         tintColor={'black'}
          //         iconTintColor={'black'}
          //         ext={getExtensionIcon(ext)}
          //       />
          //     </View>
          //   </View>
          //   <ChatMsgInfo
          //     time={getTimeStamp(chatItem.user.timestamp).timestamp}
          //     avatar={chatItem.user.imgSrc}
          //     userData={chatItem}
          //   />
          // </View>
        )}
      </View>
    ),
    [chatItem, pos],
  );
}

export default ChatFileBlock;
