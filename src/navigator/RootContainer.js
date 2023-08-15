import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {Component} from 'react';
import {AppState, Keyboard, View} from 'react-native';
import {SignInScreen, SplashScreen} from '../screens';
import MainNavigator from './MainNavigator';
import {navigationRef} from './NavigationUtils';
const Stack = createStackNavigator();

export default class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      isNetConnected: true,
    };
    this.currentScreen = null;
    this.routeNameRef = React.createRef();
    this.appStateRef = null;
  }

  componentDidMount() {
    this.unsubscribe = NetInfo?.addEventListener(state => {
      this.internetChecker(state?.isConnected);
    });
    this.registerAppStateEvent();
  }

  componentWillUnmount() {
    this.unregisterAppStateEvent();
  }

  componentDidUpdate(prevProps, prevState) {
    const {isNetAvailable} = this.props;
    if (prevProps.isNetAvailable !== isNetAvailable) {
      this.connectivityChange(isNetAvailable);
    }
  }

  internetChecker = isConnected => {
    this.connectivityChange(isConnected);
  };

  connectivityChange = isConnected => {
    if (!isConnected) Keyboard.dismiss();
    if (isConnected) {
    }
    // setIsNetAvailableForApi(isConnected);
    this.setState({isNetConnected: isConnected});
  };

  recheckConnectivity = () => {
    NetInfo.fetch().then(state => {
      this.internetChecker(state?.isConnected);
    });
  };

  registerAppStateEvent() {
    this.appStateRef = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
  }

  unregisterAppStateEvent() {
    this.unsubscribe?.remove?.();
    this.appStateRefz?.remove?.();
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
    } else {
    }
    this.setState({appState: nextAppState});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'lightblue'}}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            this.routeNameRef.current =
              navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={this.onNavigationStateChange}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              name={'SplashScreen'}
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'SignInScreen'}
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={'MainNavigator'}
              component={MainNavigator}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
