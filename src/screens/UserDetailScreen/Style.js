import {StyleSheet} from 'react-native';
import theme from '../../util/theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.sizes.spacing.ph,
  },
  labelStyle: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    height: theme.sizes.image.sm,
    width: theme.sizes.image.sm,
  },
  valueStyle: {
    flex: 0.5,
    // alignItems: 'center',
    alignContent: 'center',
  },
  btnStyle: {
    backgroundColor: theme.colors.brandColor.blue,
    paddingHorizontal: theme.sizes.spacing.ph,
    height: theme.sizes.spacing.xl11,
    justifyContent: 'center',
    borderRadius: 3,
    alignSelf: 'flex-end',
  },
});

export default styles;
