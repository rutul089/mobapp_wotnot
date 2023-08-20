import {NativeBaseProvider} from 'native-base';
import React, {Component} from 'react';
import {LogBox} from 'react-native';
import RootContainer from './src/navigator/RootContainer';
import API, {DevelopmentMode} from './src/apiService';
import {apiConfig} from './src/constants/urls';
LogBox.ignoreAllLogs(true);
API.getInstance().build(DevelopmentMode.DEVELOPMENT, apiConfig);
import {Provider} from 'react-redux';
import {configureStore} from './src/store';
import {RootSiblingParent} from 'react-native-root-siblings';
const store = configureStore();

const App = () => {
  return (
    <RootSiblingParent>
      <NativeBaseProvider>
        <Provider store={store}>
          <RootContainer />
        </Provider>
      </NativeBaseProvider>
    </RootSiblingParent>
  );
};

export default App;
