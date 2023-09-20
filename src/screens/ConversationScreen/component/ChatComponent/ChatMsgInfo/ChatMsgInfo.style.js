import {StyleSheet} from 'react-native';
const chatMsgInfoStyles = () =>
  StyleSheet.create({
    timeStampWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 2,
    },
    timeStamp: (side = 'left') => ({
      color: 'black',
      fontSize: 12,
      marginRight: side === 'right' ? 2 : 0,
      marginLeft: side === 'left' ? 2 : 0,
    }),
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

export {chatMsgInfoStyles};
