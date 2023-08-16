import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {goBack} from '../../../navigator/NavigationUtils';
import UserDetailComponent from '../component/UserDetailComponent';

export default class UserDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPressLeftContent = this.onPressLeftContent.bind(this);
  }

  onPressLeftContent = () => {
    goBack();
  };

  render() {
    return (
      <>
        <UserDetailComponent
          onPressLeftContent={this.onPressLeftContent}
          data={{
            name: 'Andrew Valentina Raz',
            email: 'Andrew@example.com',
            countrycode: 'IN',
            zipcode: '380001',
            phone:'+91 9876543210',
            url:'http://app.wotnot.io/bo',
            city:'Ahmedabad'
          }}
        />
      </>
    );
  }
}
