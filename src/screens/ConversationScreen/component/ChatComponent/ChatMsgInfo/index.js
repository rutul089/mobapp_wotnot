import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Thumbnail} from 'native-base';
import {
  getUserAcronym,
  getAgentAcronym,
} from '../../../../../util/ChatHistoryHelper';
import {AVATAR_COLORS} from '../../../../../util/helper';
import TickerTimeStamp from '../ChatItemTicker';
import {Text} from '../../../../../components';
import images from '../../../../../assets/images';

const ChatMsgInfo = props => {
  const {time, timeStampRight, userData, chatUserName} = props;

  const getAcronym = (data, type = 'agent') => {
    let acronym = null;
    if (type === 'agent') {
      acronym = getAgentAcronym(data);
    } else {
      acronym = getUserAcronym(chatUserName);
    }
    return acronym;
  };
  return (
    <View style={styles.timeStampWrapper}>
      {timeStampRight ? (
        <>
          <TickerTimeStamp time={time} style={styles.timeStampRight} />
          {/* Code for user image icon for right side */}
          {/* {userData.user ? (
            userData.user.image_url ? (
              <Image
                resizeMode="contain"
                style={styles.msgAvatar}
                source={{uri: userData.user.image_url}}
              />
            ) : chatUserName ? (
              <View
                style={[
                  styles.msgAvatar,
                  styles.acronymAvatar,
                  {
                    backgroundColor:
                      AVATAR_COLORS[
                        getAcronym(userData.user, 'user').charAt(0)
                      ],
                  },
                ]}>
                <Text style={styles.acronymText}>
                  {getAcronym(userData.user, 'user')}
                </Text>
              </View>
            ) : (
              <Image
                resizeMode="contain"
                style={styles.msgAvatar}
                source={images.ic_userprofile}
              />
            )
          ) : userData.agent && userData.agent.image_url ? (
            <Image
              resizeMode="contain"
              style={styles.msgAvatar}
              source={{uri: userData.agent.image_url}}
            />
          ) : userData.agent && userData.agent.user_type === 'bot' ? (
            <Image
              resizeMode="contain"
              style={styles.msgAvatar}
              source={images.ic_bot}
            />
          ) : (
            <View
              style={[
                styles.msgAvatar,
                styles.acronymAvatar,
                {
                  backgroundColor:
                    AVATAR_COLORS[getAcronym(userData.agent).charAt(0)],
                },
              ]}>
              <Text style={styles.acronymText}>
                {getAcronym(userData.agent)}
              </Text>
            </View>
          )} */}
        </>
      ) : (
        <>
          {/* {userData.user.image_url ? (
            <Image
              resizeMode="contain"
              style={styles.msgAvatar}
              source={{uri: userData.user.image_url}}
            />
          ) : chatUserName ? (
            <View
              style={[
                styles.msgAvatar,
                styles.acronymAvatar,
                {
                  backgroundColor:
                    AVATAR_COLORS[getAcronym(userData.user, 'user').charAt(0)],
                },
              ]}>
              <Text style={styles.acronymText}>
                {getAcronym(userData.user, 'user')}
              </Text>
            </View>
          ) : (
            <Image
              resizeMode="contain"
              style={styles.msgAvatar}
              source={images.ic_userprofile}
            />
          )} */}
          <TickerTimeStamp time={time} style={styles.timeStampRight} />
        </>
      )}
    </View>
  );
};

export default ChatMsgInfo;

const styles = StyleSheet.create({
  timeStampWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -5,
  },
  timeStampLeft: {
    color: 'black',
    fontSize: 12,
    marginRight: 0,
    marginLeft: 2,
  },
  timeStampRight: {
    marginRight: 5,
    marginLeft: 0,
    marginTop: 10,
  },
  msgAvatar: {
    width: 26,
    height: 26,
  },
  acronymAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26 / 2,
  },
  acronymText: {
    color: 'white',
    fontSize: 10,
  },
});
