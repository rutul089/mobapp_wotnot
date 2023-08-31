import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import {goBack} from '../../../navigator/NavigationUtils';
import SaveRecoveryComponent from '../component/SaveRecoveryComponent';
import {twoFactorCode, verifyTFAOTP} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {strings} from '../../../locales/i18n';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '../../../util/helper';

class SaveRecoveryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: '',
      qr_code: '',
      isErrOTP: false,
      errOTP: '',
      recovery_codes: [
        // 'bs0nk-gtbtr',
        // 'zwi8l-4f59o',
        // '1t8qb-sxh2r',
        // 'htcys-9096t',
        // 'n58bw-jipij',
        // '0prma-w44i3',
        // 'vueyb-g69g9',
        // '8kr4g-6d8o0',
        // 'l7q84-0xakn',
        // '7dfbz-xdxlg',
      ],
    };
    this.onCopyCodeClick = this.onCopyCodeClick.bind(this);
  }

  componentDidMount() {
    const navigation = this.props.route.params;
    this.setState({
      recovery_codes:navigation?.recovery_codes
    })
    // this.fetchTwoFactorLink();
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

  onCopyCodeClick = () => {
    showToast('Recovery code copied', 1300);
    Clipboard.setString(this.state.recovery_codes?.toString());
  };

  render() {
    let state = this.state;
    return (
      <>
        <SaveRecoveryComponent
          state={state}
          isLoading={this.props.isLoading}
          recovery_codes={this.state.recovery_codes}
          onCopyCodeClick={this.onCopyCodeClick}
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
)(SaveRecoveryContainer);
