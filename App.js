import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {SplashScreen} from './src/screens';
import RootContainer from './src/navigator/RootContainer';
import {NativeBaseProvider} from 'native-base';

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
