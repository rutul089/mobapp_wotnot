import {StyleSheet} from 'react-native';
import theme from '../../util/theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.sizes.spacing.ph,
  },
  labelStyle: {
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd:10
  },
  iconStyle: {
    height: theme.sizes.image.sm,
    width: theme.sizes.image.sm,
  },
  valueStyle: {
    flex: 0.5,
    // alignItems: 'center',
    alignContent: 'center',
    marginStart:10
  },
  btnStyle: {
    backgroundColor: theme.colors.brandColor.blue,
    paddingHorizontal: theme.sizes.spacing.ph,
    height: theme.sizes.spacing.xl11,
    justifyContent: 'center',
    borderRadius: 3,
    alignSelf: 'flex-end',
  },
  labelContainer: {
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    // padding: theme.sizes.spacing.xs10,
    borderRadius: 5,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    height:theme.normalize(95)
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
});

export default styles;
