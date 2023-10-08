import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import API, {DevelopmentMode} from './src/apiService';
import {withHooksHOC} from './src/components/withHooksHOC';
import {apiConfig} from './src/constants/urls';
import RootContainer from './src/navigator/RootContainer';
import {configureStore} from './src/store';
import {initSocket} from './src/websocket';
LogBox.ignoreAllLogs(true);
API.getInstance().build(DevelopmentMode.DEVELOPMENT, apiConfig);
const store = configureStore();

const App = () => {
  useEffect(() => {
    initSocket();
  }, []);
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

export default withHooksHOC(App);
