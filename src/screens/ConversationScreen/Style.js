import {StyleSheet} from 'react-native';
import {hp, wp} from '../../util/helper';
import theme from '../../util/theme';
import colors from '../../util/theme/colors';

const styles = StyleSheet.create({
  logoStyle: {
    height: 65,
    width: 210,
    // alignSelf: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  ph: {
    padding: theme.sizes.spacing.ph,
  },
  bottomMainContainer: {justifyContent: 'flex-end'},
  bottomContainer: {
    margin: theme.sizes.spacing.ph,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: theme.sizes.spacing.pv,
    borderColor: theme.colors.brandColor.silver,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: theme.colors.brandColor.blue,
    paddingHorizontal: theme.sizes.spacing.ph,
    height: theme.sizes.spacing.xl11,
    justifyContent: 'center',
    borderRadius: 3,
  },
  listHeader: {
    mainAssignContainer: {
      // position: 'absolute',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(1),
      marginBottom: hp(2),
    },
    assignContainer: {
      width: 'auto',
      top: 0,
      left: 0,
      right: 0,
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
      borderRadius: 10,
      backgroundColor: colors.brandColor.blue,
    },
  },
  renderItem: {
    mainContainer: {
      flexDirection: 'row',
      width: '100%',
      gap: wp(2),
    },
    renderItemContainer: {
      height: 'auto',
      width: '100%',
      paddingVertical: 2,
      gap: hp(1),
    },
    sentBubble: {
      alignItems: 'flex-end',
    },
    receivedBubble: {
      alignItems: 'flex-start',
    },
    innerContainer: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      maxWidth: '85%',
      padding: hp(1),
    },
    innerContainerSent: {
      backgroundColor: colors.brandColor.blue,
      borderTopLeftRadius: 10,
      color: colors.white,
    },
    innerContainerReceived: {
      backgroundColor: '#F7F7F7',
      borderTopRightRadius: 10,
      color: colors.black,
    },
    timeStamp: {color: '#858585'},
    image: {
      height: theme.sizes.image.xl3,
      width: theme.sizes.image.xl3,
      borderRadius: theme.sizes.image.xl3 / 2,
    },
  },
  sendMessageContainer: {
    mainContainer: (inputHeight, keyboardHeight) => ({
      height: inputHeight,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#858585',
      marginBottom: keyboardHeight,
      paddingHorizontal: theme.sizes.spacing.sm,
      paddingVertical: theme.sizes.spacing.xs,
      gap: theme.sizes.spacing.xs,
    }),
    attachmentButton: {
      height: theme.normalize(20),
      width: theme.normalize(20),
      tintColor: '#A7A7A7',
    },
    inputBox: inputHeight => ({
      flex: 1,
      height: inputHeight,
    }),
    sendButton: {height: 20, width: 20, tintColor: '#A7A7A7'},
  },
  bottomSheetContainer: {
    mainContainer: {
      mask: {backgroundColor: 'transparent'},
      container: {
        elevation: 100,
        borderTopLeftRadius: theme.normalize(10),
        borderTopRightRadius: theme.normalize(10),
      },
    },
    actionItemIcon: {
      height: 20,
      width: 20,
      tintColor: theme.colors.bluish_grey,
    },
  },
  assigneeHeader: {
    backgroundColor: theme.colors.brandColor.FAFAFA,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    height: theme.sizes.spacing.xl3,
    paddingHorizontal: theme.sizes.spacing.ph,
    flexDirection: 'row',
    alignItems: 'center',
  },
  assigneeIcon: {
    height: theme.sizes.image.md,
    width: theme.sizes.image.md,
    tintColor: 'black',
  },
  durationContainer: {
    backgroundColor: '#d5e3f8',
    padding: theme.normalize(5),
    borderRadius: theme.normalize(5),
    alignSelf: 'flex-end',
  },
  avatarStyle: {
    height: theme.sizes.image.xl4,
    width: theme.sizes.image.xl4,
    borderRadius: theme.sizes.image.xl4 / 2,
  },
  iconStyle: {
    height: theme.sizes.image.xs2,
    width: theme.sizes.image.xs2,
  },
  imageContainerCross: {
    height: theme.normalize(18),
    width: theme.normalize(18),
    borderRadius: theme.normalize(9),
    backgroundColor: '#f0f2f5',
    position: 'absolute',
    right: -10,
    top: -10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
