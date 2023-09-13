import {StyleSheet} from 'react-native';
import theme from '../../util/theme';

const styles = StyleSheet.create({
  logoStyle: {
    height: 65,
    width: 210,
    // alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabContainerStyle: {
    height: theme.normalize(36),
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.normalize(135),
  },
  selectedTanContainerStyle: {
    height: theme.normalize(36),
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.normalize(138),
    borderBottomWidth:1,
    borderBottomColor:theme.colors.brandColor.blue,
  },
});

export default styles;
