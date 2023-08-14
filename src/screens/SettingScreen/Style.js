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
});

export default styles;
