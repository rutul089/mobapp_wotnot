import {StyleSheet} from 'react-native';
import theme from '../../util/theme';

const styles = StyleSheet.create({
  logoStyle: {
    height: 65,
    width: 210,
    // alignSelf: 'center',
  },
  mainContainer: {
    padding: theme.sizes.spacing.ph,
    flexGrow: 1,
  },
  bottomMainContainer: {
    mask: {backgroundColor: 'transparent'},
    container: {
      elevation: 100,
      borderTopLeftRadius: theme.normalize(10),
      borderTopRightRadius: theme.normalize(10),
    },
  },
  actionItemIcon: {height: 20, width: 20},
});

export default styles;
