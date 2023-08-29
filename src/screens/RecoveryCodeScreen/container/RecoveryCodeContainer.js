import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {goBack} from '../../../navigator/NavigationUtils';
import TwoFactorCheckComponent from '../../TwoFactorCheckContainer/component/TwoFactorCheckComponent';
import {
  twoFactorCode,
  verifyTFAOTP,
  verifyRecoveryCode,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {strings} from '../../../locales/i18n';

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
    if (verifyCode === '' || verifyCode === null || verifyCode.length < 6) {
      this.setState({
        errOTP: strings('error.errValidRecoveryCode'),
      });
      return;
    }

    let param = {
      recovery_code: verifyCode,
    };
    this.props.verifyRecoveryCode(param, {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res, true, true, true);
      },
    });
  };

  recoveryCodeBtnPress = () => {};

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
          tittle={strings('login.recover_2fa_code')}
          tittle2={strings('login.recover_2fa_code_note')}
          inputLabel={strings('login.enter_recovery_code')}
          btnLabel={strings('button.verify_code')}
          isLoading={this.props.isLoading}
        />
      </>
    );
  }
}

const mapActionCreators = {twoFactorCode, verifyTFAOTP, verifyRecoveryCode};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(RecoveryCodeContainer);
