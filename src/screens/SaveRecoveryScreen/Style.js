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
  icDoneIcon: {
    height: theme.sizes.icons.lg,
    width: theme.sizes.icons.lg,
    resizeMode: 'contain',
    marginRight: theme.normalize(8),
  },
  doneStyleContainer: {
    height: theme.normalize(45),
    backgroundColor: 'rgba(255, 160, 67, 0.1)',
    borderRadius: theme.normalize(8),
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#FFA043',
    flexDirection: 'row',
  },
});

export default styles;
