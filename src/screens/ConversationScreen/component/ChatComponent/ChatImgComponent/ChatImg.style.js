import {StyleSheet} from 'react-native';
import {
  grow,
  alingCenter,
  justifyCenter,
} from '~/assets/styles/_partials/_flex';

const chatImgStyles = () =>
  StyleSheet.create({
    msgContainer: (end = false) => ({
      alignItems: end ? 'flex-end' : 'flex-start',
      marginVertical: 10,
    }),
    imgContainer: (imgType = 'recieve') => ({
      flex: 1,
      borderTopLeftRadius: imgType === 'recieve' ? 2 : 5,
      borderBottomLeftRadius: imgType === 'recieve' ? 2 : 5,
      borderTopRightRadius: imgType === 'recieve' ? 5 : 2,
      borderBottomRightRadius: imgType === 'recieve' ? 5 : 2,
    }),
    imgSize: (width = 150, height = 120) => {
      return {
        width: width,
        height: height,
        borderRadius: 7,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      };
    },
  });

export {chatImgStyles};
