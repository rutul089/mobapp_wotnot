import {StyleSheet} from 'react-native';
import {alingCenter} from '~/assets/styles/_partials/_flex';
import {backgroundColor} from '~/assets/styles/_partials/_backgroundColor';
import {fontColor} from '~/assets/styles/_partials/_fontColor';

const chatTextStyles = () =>
  StyleSheet.create({
    msgContainer: (end = false) => ({
      alignItems: end ? 'flex-end' : 'flex-start',
      marginVertical: 10,
    }),
    msg: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      maxWidth: '80%',
      minWidth: 35,
    },
    linkButton: {
      height: 'auto',
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
    },
    sendMsg: {
      backgroundColor: '#306CFF',
      fontColor: 'white',
    },
    clickableMsg: {
      paddingLeft: 8,
      paddingRight: 2,
    },
    sendMsgBorder: {
      borderTopLeftRadius: 7,
      borderBottomLeftRadius: 7,
      borderTopRightRadius: 2,
      borderBottomRightRadius: 7,
      overflow: 'hidden',
    },
    receiveMsgBorder: {
      borderTopLeftRadius: 2,
      borderBottomLeftRadius: 7,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 7,
      overflow: 'hidden',
    },
    receiveMsg: {
      backgroundColor: '#F7F7F7',
      color: '#101010',
      marginBottom: 0,
    },
  });

export {chatTextStyles};
