import React, {Component} from 'react';
import SignInScreenComponent from '../component/SignInScreenComponent';

export default class SignInScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SignInScreenComponent />
      </>
    );
  }
}
