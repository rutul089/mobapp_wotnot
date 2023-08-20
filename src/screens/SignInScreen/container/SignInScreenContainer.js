import React, {Component} from 'react';
import {connect} from 'react-redux';
import {navigate} from '../../../navigator/NavigationUtils';
import {userLogin} from '../../../store/actions';
import SignInScreenComponent from '../component/SignInScreenComponent';
import {VALIDATION_REGEX} from '../../../util/helper';
import {strings} from '../../../locales/i18n';
import { handleFailureCallback } from '../../../util/apiHelper';

class SignInScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'it.rutul@gmail.com',
      password: 'Navkar@2021',
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
    }
    this.props.userLogin(param, {
      SuccessCallback: res => {
        // AsyncStorage.setItem(IS_LOGIN, JSON.stringify(true));
        // AsyncStorage.setItem(AUTH_TOKEN, res?.data?.access);
        // AsyncStorage.setItem(REFRESH_TOKEN, res?.data?.refresh);
        // AsyncStorage.setItem(USER_DETAIL, JSON.stringify(res?.data));
        // API.getInstance().setHeader(
        //   Headers.AUTHORIZATION,
        //   `Bearer ${res?.data?.access}`,
        // );
        // navigateAndSimpleReset('Home');
      },
      FailureCallback: res => {
        handleFailureCallback(res, true, true);
      },
    });

    navigate('MainNavigator');
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
          onSubmitEditingEmail={() => this.passWordInputRef?.current?.focus()}
          isPwdVisible={state.isPwdVisible}
          rightIconClick={this.rightIconClick}
          onSubmit={this.onSubmit}
          scrollViewRef={this.scrollViewRef}
          isLoading={this.props.isLoading}
        />
      </>
    );
  }
}

const mapActionCreators = {
  userLogin,
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
