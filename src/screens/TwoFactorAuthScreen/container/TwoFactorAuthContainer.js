import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  goBack,
  navigateAndSimpleResetWithParam,
} from '../../../navigator/NavigationUtils';
import TwoFactorAuthComponent from '../component/TwoFactorAuthComponent';
import {twoFactorCode, verifyTFAOTP} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {strings} from '../../../locales/i18n';

class TwoFactorAuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: '',
      qr_code: '',
      isErrOTP: false,
      errOTP: '',
    };
    this.moreInfoModalRef = React.createRef();
  }

  componentDidMount() {
    this.fetchTwoFactorLink();
  }

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
    if (verifyCode === '' || verifyCode === null) {
      this.setState({
        errOTP: strings('error.errEmpty'),
      });
      return;
    }

    if (verifyCode && verifyCode.length < 6) {
      this.setState({
        errOTP: strings('error.errTwoFACode'),
      });
      return;
    }

    let param = {
      totp: verifyCode,
    };
    this.props.verifyTFAOTP(param, {
      SuccessCallback: res => {
        if (res?.ok) {
          navigateAndSimpleResetWithParam('SaveRecoveryScreen', 0, {
            recovery_codes: res?.recovery_codes,
          });
        }
      },
      FailureCallback: res => {
        handleFailureCallback(res, true, true);
      },
    });
  };

  fetchTwoFactorLink = () => {
    this.props.twoFactorCode({
      SuccessCallback: res => {
        this.setState({
          qr_code: res?.qr_code,
        });
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  render() {
    let state = this.state;
    return (
      <>
        <TwoFactorAuthComponent
          onPressLeftContent={this.onPressLeftContent}
          onVerifyCodeChange={this.onVerifyCodeChange}
          onSubmitVerifyCode={this.onVerifyCodePress}
          state={state}
          onSubmit={this.onVerifyCodePress}
          qr_code={state?.qr_code}
          isLoading={this.props.isLoading}
          moreInfoModalRef={this.moreInfoModalRef}
        />
      </>
    );
  }
}

const mapActionCreators = {twoFactorCode, verifyTFAOTP};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(TwoFactorAuthContainer);
