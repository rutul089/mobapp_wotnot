import {StyleSheet} from 'react-native';
import {
  grow,
  noGrow,
  alignEnd,
  alingCenter,
  justifyCenter,
} from '~/assets/styles/_partials/_flex';
import {variables} from '~/assets/styles/_abstracts/variables';
import theme from '../../../../../util/theme';

const chatFileStyles = () =>
  StyleSheet.create({
    msgContainer: (end = false) => ({
      alignItems: end ? 'flex-end' : 'flex-start',
      marginVertical: 10,
    }),
    fileContainer: type => ({
      backgroundColor: type ? theme.colors.clear_blue : theme.colors.pale_grey,
      flex: 1,
      maxWidth: '80%',
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderTopLeftRadius: !type ? 2 : 5,
      borderBottomLeftRadius: !type ? 2 : 5,
      borderTopRightRadius: !type ? 5 : 2,
      borderBottomRightRadius: !type ? 5 : 2,
    }),
    fileBlock: type =>
      StyleSheet.create({
        flexGrow: {
          flex: 1,
        },
        wrapper: {
          minWidth: 230,
          paddingRight: 20,
          flexDirection: 'row',
        },
        iconContainer: {
          backgroundColor: type ? theme.colors.white : theme.colors.clear_blue,
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          marginRight: 10,
        },
        icon: {
          color: type ? theme.colors.charcoal_grey : theme.colors.white,
        },
        fileNameCotainer: {
          flexDirection: 'row',
          flex: 1,
          paddingRight: 20,
          alignItems: 'center',
        },
        fileName: {
          color: type ? theme.colors.white : theme.colors.charcoal_grey,
          fontSize: 14,
        },
        fileExtension: {
          flex: 1,
        },
        fileSize: {
          color: type ? theme.colors.white : theme.colors.cool_grey,
          fontSize: 10,
        },
      }),
  });

export {chatFileStyles};
