import theme from '../../../../../util/theme';

export const styles = {
  bubbleWrapper: {
    height: 'auto',
    width: '100%',
    paddingVertical: 2,
    alignItems: 'flex-end',
    marginBottom: theme.normalize(5),
  },
  bubbleContainer: {
    backgroundColor: theme.colors.bubbleBackgroundColor,
    borderRadius: 10,
    borderTopRightRadius: 2,
    maxWidth: '80%',
  },
  textStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxWidth: '80%', // Change this style to all of bubble add maxWidth to container
    minWidth: 35,
  },
  bubbleContainerVisitor: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderTopLeftRadius: 2,
  },
  msgAvatar: {
    height: theme.sizes.image.xl3,
    width: theme.sizes.image.xl3,
    borderRadius: theme.sizes.image.xl3 / 2,
  },
  acronymAvatar: {
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acronymText: {
    color: 'white',
    fontSize: 10,
  },
};
