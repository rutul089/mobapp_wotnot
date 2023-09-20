// Lib
import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

import ChatItemTicker from '../ChatItemTicker';

import {Text} from '../../../../../components';

import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {
  getAssigneeChangeMsgText,
  getStatusChangeMsgText,
} from '../../../../../util/ChatHistoryHelper';
import theme from '../../../../../util/theme/';
import typography from '../../../../../util/theme/typography';

function ChatDateStampLabel(props) {
  const {loggedInUserId, chatItem, pos} = props;

  let msg = chatItem.agent.assigned
    ? getAssigneeChangeMsgText(chatItem, loggedInUserId)
    : chatItem.agent.status
    ? getStatusChangeMsgText(chatItem, loggedInUserId)
    : null;
  return useMemo(
    () => (
      <>
        {msg ? (
          <View
            style={{
              flex: 1,
              position: pos,
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <Text type={'caption12'} style={styles.dateStampLabel}>
              {msg}
              <ChatItemTicker
                time={
                  chatItem.agent.timestamp === 'now'
                    ? 'now'
                    : getTimeStamp(chatItem.agent.timestamp).timestamp
                }
                style={styles.dateStampLabel}
              />
            </Text>
          </View>
        ) : null}
      </>
    ),
    [chatItem, pos],
  );
}

export default ChatDateStampLabel;

const styles = StyleSheet.create({
  dateStampLabel: {
    borderRadius: theme.normalize(5),
    paddingVertical: 2,
    paddingHorizontal: 15,
    overflow: 'hidden',
    lineHeight: 15,
    fontSize: typography.fontSizes.xs2,
    backgroundColor: theme.colors.brandColor.blue,
    color: 'white',
  },
});
