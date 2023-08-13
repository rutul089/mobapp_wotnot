import {StyleSheet} from 'react-native';
import {hp} from '../../util/helper';
import colors from '../../util/theme/colors';

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
  },
  container: {
    padding: 20,
    paddingTop: hp('13'),
    flex: 1,
    alignItems: 'center',
  },
  welcome_message_1: {marginTop: hp('4.5')},
  welcome_message_2: {marginTop: hp('0.75')},
  sign_in_with_google: {marginTop: hp('5.1')},
  divider: {
    marginTop: hp('5.1'),
    marginBottom: hp('2.7'),
    height: 1,
    width: '100%',
    backgroundColor: colors.typography.light,
  },
  input_container_main: {
    width: '100%',
    alignSelf: 'flex-start',
    gap: hp('2.25'),
  },
  input_container: {width: '100%', gap: hp('0.3')},
  input: {height: hp('6')},
  btn_forgot_password: {color: colors.typography.link},
});

export default styles;
