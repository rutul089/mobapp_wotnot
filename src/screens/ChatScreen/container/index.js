import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ChatScreenComponent from '../component';

export default class ChatScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <ChatScreenComponent />
      </>
    );
  }
}
