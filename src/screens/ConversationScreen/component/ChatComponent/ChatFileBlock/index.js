import React, {useMemo} from 'react';
import FileViewer from 'react-native-file-viewer';

import {View, Linking, Platform} from 'react-native';
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
import {getDownloadPermissionAndroid} from '../../../../../util/NotificationHelper';
import {downloadFile} from './helper';

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
    Platform.OS === 'ios'
      ? Linking.canOpenURL(cUri).then(supported => {
          supported ? Linking.openURL(cUri) : null;
        })
      : callDownloadFile();
  };

  const callDownloadFile = () => {
    console.log('12312312312312');

    getDownloadPermissionAndroid().then(granted => {
      if (granted) {
        downloadFile(cUri, fileName, ext).then(res => {
          FileViewer.open(res?.data);
        });
      } else {
        console.log('123-0----');
      }
    });
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
