import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../../navigator/NavigationUtils';
import {userLogin, fetchUserPreference} from '../../../store/actions';
import SignInScreenComponent from '../component/SignInScreenComponent';
import {VALIDATION_REGEX} from '../../../util/helper';
import {strings} from '../../../locales/i18n';
import {handleFailureCallback} from '../../../util/apiHelper';
import {API, Headers} from '../../../apiService';
import AsyncStorage from '@react-native-community/async-storage';
import {LOCAL_STORAGE} from '../../../constants/storage';
import DeviceWebSocketManager from '../../../apiService/WebSocketManager';

class SignInScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isErrEmail: false,
      isErrPwd: false,
      isPwdVisible: false,
      emailErrMsg: '',
      pwdErrMsg: '',
    };
    this.emailInputRef = React.createRef();
    this.passWordInputRef = React.createRef();
    this.scrollViewRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    DeviceWebSocketManager.getInstance().connect();
  }

  onEmailChange = text => {
    this.setState({email: text, emailErrMsg: ''});
  };

  onPwdChange = text => {
    this.setState({password: text, pwdErrMsg: ''});
    this.scrollViewRef?.current?.scrollToEnd({animated: true});
  };

  rightIconClick = () => {
    this.setState({isPwdVisible: !this.state.isPwdVisible});
  };

  onSubmit = () => {
    let state = this.state;

    if (this.isValidEmail() && this.isValidPassword()) {
      this.setState({
        emailErrMsg: strings('error.errEmail'),
        pwdErrMsg: strings('error.errPwd'),
      });
      return;
    }
    if (this.isValidEmail()) {
      this.setState({
        emailErrMsg: strings('error.errEmail'),
      });
      return;
    }

    if (this.isValidPassword()) {
      this.setState({
        pwdErrMsg: strings('error.errPwd'),
      });
      return;
    }
    let param = {
      email: state.email?.toLocaleLowerCase(),
      password: state.password,
    };
    this.props.userLogin(param, {
      SuccessCallback: res => {
        if (res?.ok && res?.two_factor_auth === undefined) {
          AsyncStorage.setItem(LOCAL_STORAGE.IS_LOGIN, JSON.stringify(true));
          this.callFetchUserPreference();
          return;
        }
        AsyncStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, res?.access_token);
        API.getInstance().setHeader(
          Headers.AUTHORIZATION,
          `Bearer ${res?.access_token}`,
        );
        if (res?.two_factor_auth === 'QR_CODE') {
          return navigate('TwoFactorAuthScreen');
        } else if (res?.two_factor_auth === 'TOTP_VERIFY') {
          return navigate('TwoFactorCheckScreen');
        } else {
          AsyncStorage.setItem(LOCAL_STORAGE.IS_LOGIN, JSON.stringify(true));
          this.callFetchUserPreference();
        }
      },
      FailureCallback: res => {
        handleFailureCallback(res, true, true);
      },
    });

    // navigate('MainNavigator');
  };

  isValidEmail = () => {
    let state = this.state;
    return !(state.email && VALIDATION_REGEX.email.test(state.email));
  };

  isValidPassword = () => {
    let state = this.state;
    return !(
      state.password &&
      state.password.length > 5 &&
      !VALIDATION_REGEX.hasEmoji.test(state.password)
    );
  };

  onForgotPwdClick = () => {
    navigate('ForgotPasswordScreen');
    // navigate('TwoFactorAuthScreen')
  };

  _googleSignIn = () => {};

  callFetchUserPreference = () => {
    this.props.fetchUserPreference(null, {
      SuccessCallback: res => {
        AsyncStorage.setItem(
          LOCAL_STORAGE?.USER_PREFERENCE,
          JSON.stringify(res),
        );
        navigateAndSimpleReset('MainNavigator');
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
        <SignInScreenComponent
          state={this.state}
          onEmailChange={this.onEmailChange}
          onPwdChange={this.onPwdChange}
          emailInputRef={this.emailInputRef}
          passWordInputRef={this.passWordInputRef}
          onSubmitEditingEmail={() => {
            this.passWordInputRef?.current?.focus(),
              this.scrollViewRef?.current?.scrollToEnd({animated: true});
          }}
          isPwdVisible={state.isPwdVisible}
          rightIconClick={this.rightIconClick}
          onSubmit={this.onSubmit}
          scrollViewRef={this.scrollViewRef}
          isLoading={this.props.isLoading}
          onForgotPwdClick={this.onForgotPwdClick}
          _googleSignIn={this._googleSignIn}
        />
      </>
    );
  }
}

const mapActionCreators = {
  userLogin,
  fetchUserPreference,
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(SignInScreenContainer);
