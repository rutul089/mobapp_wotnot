import React from 'react';
import {Text, View} from 'react-native';
import ChatFileBlock from '../ChatFileBlock';
import ChatImg from '../ChatImg';

const ChatFileResponse = ({fileList, chatUserName, itemWithAccountDetails,onToggleImageModal}) => (
  <View>
    {fileList?.map((file, i) => {
      return file.type === 'file' ? (
        <>
          <ChatFileBlock
            key={i}
            fileIndex={fileList.length - 1 - i}
            pos={
              itemWithAccountDetails.pos
                ? itemWithAccountDetails.pos
                : 'relative'
            }
            chatItem={itemWithAccountDetails}
            chatUserName={chatUserName}
          />
        </>
      ) : file.type === 'img' ? (
        <ChatImg
          key={i}
          fileIndex={fileList.length - 1 - i}
          pos={
            itemWithAccountDetails.pos ? itemWithAccountDetails.pos : 'relative'
          }
          chatItem={itemWithAccountDetails}
          onToggleImageModal={onToggleImageModal}
          chatUserName={chatUserName}
        />
      ) : (
        <></>
      );
    })}
  </View>
);

export default ChatFileResponse;
