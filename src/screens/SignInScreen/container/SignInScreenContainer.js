import React, {Component} from 'react';
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
            console.log('onSubmit===>', email, password);
            this.setState({email, password});
          }}
        />
      </>
    );
  }
}
