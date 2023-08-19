import {NativeBaseProvider} from 'native-base';
import React, {Component} from 'react';
import { LogBox } from 'react-native';
import RootContainer from './src/navigator/RootContainer';
import API, { DevelopmentMode } from './src/apiService';
import { apiConfig } from './src/constants/urls';
LogBox.ignoreAllLogs(true);
API.getInstance().build(DevelopmentMode.DEVELOPMENT, apiConfig);

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
