import {StyleSheet} from 'react-native';
import theme from '../../../../../util/theme';

const chatImgStyles = () =>
  StyleSheet.create({
    msgContainer: (end = false) => ({
      alignItems: end ? 'flex-end' : 'flex-start',
      marginVertical: 10,
    }),
    imgContainer: (imgType = 'recieve') => ({
      //   flex: 1,
      borderTopLeftRadius: imgType === 'recieve' ? 2 : 5,
      borderBottomLeftRadius: imgType === 'recieve' ? 2 : 5,
      borderTopRightRadius: imgType === 'recieve' ? 5 : 2,
      borderBottomRightRadius: imgType === 'recieve' ? 5 : 2,
    }),
    imgSize: (width = theme.normalize(215), height = theme.normalize(150)) => {
      return {
        width: width,
        height: height,
        borderRadius: 7,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      };
    },
  });

export {chatImgStyles};
