/**
 * Manager class to manage WebSocket that need to be created inside application.
 */
import {AppState, DeviceEventEmitter} from 'react-native';
import {isEmpty} from 'lodash';
import {WebSocketURL} from '../constants/urls';

let websocketManager: WebSocketManager = null;
let socketObj: WebSocket = null;
let isConnected = true;
let currentEvent = null;
let appState = AppState.currentState;
let isForceClose = false;
let userToken = null;
let tempConnectData = null;

export default class WebSocketManager {
  static getInstance() {
    if (!websocketManager) {
      websocketManager = new WebSocketManager();
    }

    return websocketManager;
  }

  connect(connectData) {
    if (websocketManager && (!socketObj || !isConnected)) {
      websocketManager.createConnection(connectData);
    }
    appState = AppState.currentState;
    AppState.addEventListener('change', websocketManager._handleAppStateChange);
    return websocketManager;
  }

  _handleAppStateChange = nextAppState => {
    console.log(' WSdashboard    ' + appState);
    if (appState?.match(/inactive|background/) && nextAppState === 'active') {
      if (websocketManager) {
        websocketManager?.connect().sendEvent(currentEvent);
      } else {
        DeviceEventEmitter.emit('SocketOnError', {code: 1001});
      }
    } else {
      websocketManager?.closeSocket();
      isForceClose = true;
    }
    appState = nextAppState;
  };

  /**
   * do not call this method from outside
   */
  async createConnection(connectData) {
    let base_url = '';
    let queryString = '';
    if (!socketObj || !isConnected) {
      //   if (connectData?.isLocal) {
      //     base_url = `${Urls?.websocketBaseURL}${connectData?.ipAddress}:${Urls?.websocketPort}`;
      //     socketObj = new WebSocket(base_url);
      //   } else {
      //     queryString = Object.keys(connectData)
      //       .map((key) => `${key}=${connectData[key]}`)
      //       .join("&");
      //     base_url = `${Urls.baseWebSocketUrl}?${queryString}`;
      //     socketObj = new WebSocket(`${base_url}?${queryString}`);
      //   }
      queryString = Object.keys(connectData)
        .map(key => `${key}=${connectData[key]}`)
        .join('&');
      base_url = `${WebSocketURL}?${queryString}`;
      socketObj = new WebSocket(`${base_url}?${queryString}`);
      console.log('===>>>>>> base_url', base_url);

      websocketManager.registerListener(socketObj);
      return socketObj;
    }
    return socketObj;
  }
  /**
   * do not call this method from outside
   */
  registerListener(socketObj) {
    socketObj.onopen = event => {
      isConnected = true;
      isForceClose = false;
      console.log('came onopen12 WSdashboard', new Date());
    };
    socketObj.onmessage = event => {
      let data = JSON.parse(!isEmpty(event?.data) ? event?.data : '""');
      DeviceEventEmitter.emit('SocketOnMessage', data);
    };
    socketObj.onclose = event => {
      isConnected = false;
      socketObj = null;
      userToken = null;
      websocketManager = null;
      if (
        event?.reason === 'Stream end encountered' ||
        event?.reason === 'Connection Closed Normally'
      ) {
        // reconnect socket
        DeviceEventEmitter.emit('SocketOnError', event);
      }
    };
    socketObj.onerror = event => {
      console.log('registerListener Error', event);
      isConnected = false;
      try {
        console.log(' WSdashboard came to --- onerror ', event);
        if (!isForceClose) {
          DeviceEventEmitter.emit('SocketOnError', event);
        }
      } catch (error) /* istanbul ignore next */ {
        if (!isForceClose) {
          DeviceEventEmitter.emit('SocketOnError', error);
        }
      }
    };
  }
  /**
   * call this to send event and receive response for particular event
   * @param {*} request
   * @param {*} routeName
   * @param {*} callbackMessage
   */
  sendEvent(request) {
    let timeInterval = setInterval(() => {
      if (isConnected) {
        try {
          currentEvent = request;
          socketObj?.send(JSON.stringify(request));
          clearInterval(timeInterval);
        } catch (error) {
          console.log('==============>>>>>>>>>>>', error);
        }
      } else {
        DeviceEventEmitter.emit('SocketOnError', {code: 1000});
      }
    }, 1000);
  }

  /**
   * Call this method to unsbscribe perticular action
   * @param {*} request
   */
  disconnectEvent(request) {
    if (isConnected) socketObj.send(request);
  }

  closeSocket() {
    if (socketObj) {
      isConnected = false;
      socketObj.close();
    }
  }

  reConnect() {
    WebSocketManager.getInstance().connect(tempConnectData);
  }

  setIsConnect(value) {
    isConnected = value;
  }

  static getIsConnect() {
    return isConnected;
  }

  setSocketObject(object) {
    socketObj = object;
  }

  static getIsOpen() {
    return isConnected;
  }
}
