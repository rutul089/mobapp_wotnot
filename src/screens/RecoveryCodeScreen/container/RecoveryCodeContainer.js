import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  goBack,
  navigateAndSimpleReset,
} from '../../../navigator/NavigationUtils';
import TwoFactorCheckComponent from '../../TwoFactorCheckContainer/component/TwoFactorCheckComponent';
import {
  twoFactorCode,
  verifyTFAOTP,
  verifyRecoveryCode,
  fetchUserPreference,
  fetchAccounts,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {setLocale, strings} from '../../../locales/i18n';
import {VALIDATION_REGEX} from '../../../util/helper';
import {LOCAL_STORAGE} from '../../../constants/storage';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getItemFromStorage,
  setItemToStorage,
} from '../../../util/DeviceStorageOperations';
class RecoveryCodeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: '',
      qr_code: '',
      isErrOTP: false,
      errOTP: '',
    };
  }

  componentDidMount() {}

  onPressLeftContent = () => {
    goBack();
  };

  onVerifyCodeChange = text => {
    this.setState({
      verifyCode: text,
      errOTP: '',
    });
  };

  onVerifyCodePress = () => {
    const {verifyCode} = this.state;
    if (!VALIDATION_REGEX.RECOVERY_CODE.test(verifyCode)) {
      this.setState({
        errOTP: strings('error.RECOVERY_SCREEN_RECOVERY_CODE_ERROR_TEXT'),
      });
      return;
    }

    let param = {
      recovery_code: verifyCode,
    };
    this.props.verifyRecoveryCode(param, {
      SuccessCallback: res => {
        this.apiFetchUserPreference();
      },
      FailureCallback: res => {
        handleFailureCallback(res, true, true, true);
      },
    });
  };

  recoveryCodeBtnPress = () => {};

  apiFetchUserPreference = () => {
    this.props.fetchUserPreference(null, {
      SuccessCallback: res => {
        AsyncStorage.setItem(
          LOCAL_STORAGE.USER_PREFERENCE,
          JSON.stringify(res),
        );
        AsyncStorage.setItem(LOCAL_STORAGE.IS_LOGIN, 'true');
        setLocale(res?.language?.code)
        this.cllFetchAccounts()
          .then(data => {
            navigateAndSimpleReset('MainNavigator');
          })
          .catch(() => {
            console.log('Something went wrong');
          });
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  cllFetchAccounts = () => {
    return new Promise((resolve, reject) => {
      this.props.fetchAccounts({
        SuccessCallback: async res => {
          await setItemToStorage(
            LOCAL_STORAGE?.AGENT_ACCOUNT_LIST,
            res?.account_info,
          );
          resolve(
            getItemFromStorage(LOCAL_STORAGE?.AGENT_ACCOUNT_LIST) ?? undefined,
          );
        },
        FailureCallback: res => {
          handleFailureCallback(res, false, false, false);
          reject(res);
        },
      });
    });
  };

  render() {
    let state = this.state;
    return (
      <>
        <TwoFactorCheckComponent
          onPressLeftContent={this.onPressLeftContent}
          onVerifyCodeChange={this.onVerifyCodeChange}
          onSubmitVerifyCode={this.onVerifyCodePress}
          state={state}
          onSubmit={this.onVerifyCodePress}
          recoveryCodeBtnPress={this.recoveryCodeBtnPress}
          tittle={strings('login.RECOVERY_SCREEN_HEADER_TEXT')}
          tittle2={strings('login.RECOVERY_SCREEN_SUBHEADER_TEXT')}
          inputLabel={strings('login.RECOVERY_SCREEN_RECOVERY_CODE_INPUT_LABEL')}
          btnLabel={strings('button.RECOVERY_SCREEN_VERIFY_BTN_TEXT')}
          isLoading={this.props.isLoading}
          maxLength={11}
          placeholder={'XXXXX-XXXXX'}
          keyboardType={'default'}
        />
      </>
    );
  }
}

const mapActionCreators = {
  twoFactorCode,
  verifyTFAOTP,
  verifyRecoveryCode,
  fetchUserPreference,
  fetchAccounts,
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(RecoveryCodeContainer);
