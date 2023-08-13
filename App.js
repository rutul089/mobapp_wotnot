import {NativeBaseProvider} from 'native-base';
import React, {Component} from 'react';
import RootContainer from './src/navigator/RootContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NativeBaseProvider>
        <RootContainer />
      </NativeBaseProvider>
    );
  }
}
