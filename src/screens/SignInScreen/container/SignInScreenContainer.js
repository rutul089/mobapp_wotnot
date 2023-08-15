import React, {Component} from 'react';
import {navigate} from '../../../navigator/NavigationUtils';
import SignInScreenComponent from '../component/SignInScreenComponent';

export default class SignInScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <>
        <SignInScreenComponent
          onSubmit={(email, password) => {
            navigate('MainNavigator');
            this.setState({email, password});
          }}
        />
      </>
    );
  }
}
