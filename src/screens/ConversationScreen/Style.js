import {StyleSheet} from 'react-native';
import theme from '../../util/theme';

const styles = StyleSheet.create({
  logoStyle: {
    height: 65,
    width: 210,
    // alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: theme.sizes.spacing.ph,
  },
  ph: {
    padding: theme.sizes.spacing.ph,
  },
  bottomContainer: {
    margin: theme.sizes.spacing.ph,
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical:theme.sizes.spacing.pv,
    borderColor: theme.colors.brandColor.silver,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle:{
    backgroundColor: theme.colors.brandColor.blue,
    paddingHorizontal: theme.sizes.spacing.ph,
    height: theme.sizes.spacing.xl11,
    justifyContent: 'center',
    borderRadius: 3,
  }
});

export default styles;
