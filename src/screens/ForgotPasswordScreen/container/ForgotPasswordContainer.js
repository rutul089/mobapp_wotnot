import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {goBack} from '../../../navigator/NavigationUtils';
import ForgotPasswordComponent from '../component/ForgotPasswordComponent';
import {strings} from '../../../locales/i18n';
import {VALIDATION_REGEX, showToast} from '../../../util/helper';
import {forgotPassword} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';

class ForgotPasswordContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isErrEmail: false,
      emailErrMsg: '',
    };
  }

  onPressLeftContent = () => {
    goBack();
  };

  onEmailChange = text => {
    this.setState({email: text, emailErrMsg: ''});
  };

  onSubmit = () => {
    if (this.isValidEmail()) {
      this.setState({
        emailErrMsg: strings('error.EMAIL_VALIDATION_MESSAGE'),
      });
      return;
    }
    let param = {
      email: this.state.email,
    };
    this.props.forgotPassword(param, {
      SuccessCallback: res => {
        if (res?.ok) {
          showToast(
            'We have sent you an email with a link to reset your password',
          );
          setTimeout(() => {
            goBack();
          }, 2000);
        }
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };
  isValidEmail = () => {
    let state = this.state;
    return !(state.email && VALIDATION_REGEX.email.test(state.email));
  };

  render() {
    let state = this.state;
    return (
      <>
        <ForgotPasswordComponent
          onPressLeftContent={this.onPressLeftContent}
          state={state}
          onEmailChange={this.onEmailChange}
          onSubmit={this.onSubmit}
          isLoading={this.props.isLoading}
        />
      </>
    );
  }
}

const mapActionCreators = {
  forgotPassword,
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ForgotPasswordContainer);
