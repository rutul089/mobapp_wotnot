import io from 'socket.io-client';
import {getEnvironment} from '~/utils/GetEnviroment';

import {SOCKET_CONFIG} from '../util/helper';
import {getAgentPayload} from '../common/common';
import API, {Headers} from '../apiService/APIService';
import {SOCKET_BASEURL} from '../constants/urls';
let {SOCKET_EVENTS} = SOCKET_CONFIG;

export const socket = io(SOCKET_BASEURL?.[API.getInstance().getDevMode()], {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 1000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
  agent: false, // Please don't set this to true
  upgrade: false,
  rejectUnauthorized: false,
  cookie: true,
});

export async function initSocket() {
  return new Promise(resolve => {
    socket.open();
    socket.on(SOCKET_EVENTS.CONNECT, () => {
      if (socket.connected) {
        resolve(socket);
      }
      resolve(false);
    });
  });
}

export function reconnect() {
  socket.on(SOCKET_EVENTS.RECONNECT, () => {
    emitAgentJoin();
  });
}

export function disconnect() {
  if (socket) {
    socket.disconnect();
  }
}

export async function emitAgentJoin() {
  let agentpayload = await getAgentPayload();
  agentpayload['user_status'] = 'online';
  socket.emit(SOCKET_EVENTS.AGENT_JOIN, agentpayload);
}

export function changeUserStatus(msg) {
  socket.emit(SOCKET_EVENTS.USER_STATUS, msg);
}
export function agentLeave(msg) {
  socket.emit(SOCKET_EVENTS.AGENT_LEAVE, msg);
}
export function registerUserStatus(onMessageReceived) {
  socket
    .off(SOCKET_EVENTS.USER_STATUS)
    .on(SOCKET_EVENTS.USER_STATUS, onMessageReceived);
}

export function registerStatusChangedHandler(onMessageReceived) {
  socket
    .off(SOCKET_EVENTS.STATUS_CHANGED)
    .on(SOCKET_EVENTS.STATUS_CHANGED, onMessageReceived);
}

export function registerAssigneeChangedHandler(onMessageReceived) {
  socket
    .off(SOCKET_EVENTS.ASSIGNEE_CHANGED)
    .on(SOCKET_EVENTS.ASSIGNEE_CHANGED, onMessageReceived);
}

export function registerMessageHandler(onMessageReceived) {
  socket
    .off(SOCKET_EVENTS.MESSAGE)
    .on(SOCKET_EVENTS.MESSAGE, onMessageReceived);
}

export function registerConversationCreateHandler(onMessageReceived) {
  socket
    .off(SOCKET_EVENTS.CONVERSATION_CREATE)
    .on(SOCKET_EVENTS.CONVERSATION_CREATE, onMessageReceived);
}

export function unregisterHandler() {
  socket.off(SOCKET_EVENTS.MESSAGE);
}

export function emitVisitorTyping(message) {
  socket.emit(SOCKET_EVENTS.VISITOR_TYPING, message);
}

export function register(name, cb) {
  socket.emit(SOCKET_EVENTS.MESSAGE, name, cb);
}

export function emitNLPMessage(message) {
  socket.emit(SOCKET_EVENTS.MESSAGE, message);
}

export function registerAgentTypingHandler(onMessageReceived) {
  socket
    .off(SOCKET_EVENTS.AGENT_TYPING)
    .on(SOCKET_EVENTS.AGENT_TYPING, onMessageReceived);
}

export function registerVisitorTypingHandler(onMessageReceived) {
  socket
    .off(SOCKET_EVENTS.VISITOR_TYPING)
    .on(SOCKET_EVENTS.VISITOR_TYPING, onMessageReceived);
}

export function registerMessageRead(onMessageRead) {
  socket
    .off(SOCKET_EVENTS.MESSAGE_READ)
    .on(SOCKET_EVENTS.MESSAGE_READ, onMessageRead);
}

export function registerNote(onNote) {
  socket.off(SOCKET_EVENTS.NOTE).on(SOCKET_EVENTS.NOTE, onNote);
}

export function registerCustomerProfile(onCustomerProfile) {
  socket
    .off(SOCKET_EVENTS.CUSTOMER_PROFILE)
    .on(SOCKET_EVENTS.CUSTOMER_PROFILE, onCustomerProfile);
}
export function emitSwitchConversationMode(message) {
  socket.emit(SOCKET_EVENTS.SWITCH_CONVERSATION_MODE, message);
}
export function emitAgentTyping(message) {
  socket.emit(SOCKET_EVENTS.AGENT_TYPING, message);
}
