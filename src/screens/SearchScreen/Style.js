import {StyleSheet} from 'react-native';
import {hp, wp} from '../../util/helper';
import colors from '../../util/theme/colors';

const styles = StyleSheet.create({
  searchViewContainer: {flex: 1},
  searchViewInnerContainer: {flex: 1, padding: hp(1)},
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: hp(1),
    padding: hp(1),
    borderRadius: hp(1),
    borderWidth: hp(0.1),
    gap: wp(3),
    borderColor: colors.typography.silver,
  },
  activityLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {flex: 1},
});

export default styles;
