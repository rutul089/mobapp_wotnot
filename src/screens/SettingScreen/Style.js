import {StyleSheet} from 'react-native';
import theme from '../../util/theme';

const styles = StyleSheet.create({
  logoStyle: {
    width: theme.normalize(91),
    height: theme.sizes.icons.xl4,
  },
  headerStyle: {
    backgroundColor: theme.colors.brandColor.FAFAFA,
    height: theme.sizes.spacing.xl3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: theme.sizes.spacing.ph,
  },
  rowContainer: {
    height: theme.sizes.xl16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    backgroundColor: '#F5F5F5',
    height: theme.sizes.icons.xl9,
    flex: 1,
    padding: theme.sizes.spacing.xs10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSheetStyle: {
    elevation: 100,
    // borderTopLeftRadius: theme.sizes.radius.modalRadius,
    // borderTopRightRadius: theme.sizes.radius.modalRadius,
  },
});

export default styles;
