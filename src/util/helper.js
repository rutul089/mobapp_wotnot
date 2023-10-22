import moment from 'moment';
import Toast from 'react-native-root-toast';
import {CONVERSATION} from '../constants/global';

export const LONG_DURATION = Toast.durations.LONG;
export const MED_DURATION = 3000;
export const SHORT_DURATION = Toast.durations.SHORT;
export {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from './ResponsiveSize';

export const VALIDATION_REGEX = {
  email: /^\w+([\.-]?\w+)*([+]\w+)?@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
  strongPassword:
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[-\/\\^$*+?.()|[\]{}"!@#%&,><':;_~=`])(?=.{8,})/,
  mediumPassword:
    /^((?=.*[a-z])|(?=.*[-\/\\^$*+?.()|[\]{}"!@#%&,><':;_~=`])|(?=.*[0-9]))(?=.{8,})/,
  specialCharacter: /[-\/\\^$*+?.()|[\]{}"!@#%&,><':;_~=`]/,
  hasEmoji:
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/,
  isImageType: /\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
  isSvg: /\.(gif|svg)$/,
  IMAGE_TAG: /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/gim,
  IFRAME_TAG: /<iframe\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/gim,
  VIDEO_TAG: /<video\s[^>].?controls|<\/video>/gim,
  AUDIO_TAG: /<audio\s[^>].?controls|<\/audio>/gim,
  IFRAME_SRC: /src="([^"]+)"/gim,
  SOURCE_YOUTUBE: /\byoutube/gim,
  HTML_TAGS: /(<([^>]+)>)/gi,
  ANCHER_TAG: /href="([^"]*)/,
  IMAGE_SRC: /<img.*?src=['"](.*?)["']/,
  HTTP_URL:
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  RECOVERY_CODE: /^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$/,
};

export const showSWWToast = (duration = LONG_DURATION) => {
  Toast.show('Something went wrong please try again', {
    duration: duration,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

export function helperLog(tag, type) {
  if (__DEV__) {
    console.log(tag, JSON.stringify(type));
  }
}

export const showToast = (message, duration = LONG_DURATION) => {
  Toast.show(message, {
    duration: duration,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};

export const getDayDifference = date => {
  var date1 = moment(date);
  var currentDate = moment();
  let differenceM = currentDate.diff(date1, 'm');
  let differenceD = currentDate.diff(date1, 'd');
  let differenceH = currentDate.diff(date1, 'h');
  if (differenceM == 0) {
    return 'now';
  } else if (differenceM >= 1 && differenceM <= 60) {
    return `${differenceM}m`;
  } else if (differenceH >= 1 && differenceH <= 24) {
    return `${differenceH}h`;
  } else if (differenceD == 0) {
    return '1d';
  } else {
    return `${differenceD}d`;
  }
};

export const getLastActiveTime = date => {};

export const getAssigneeId = (arrayList, key = 'id', isZero = false) => {
  let assignee_ids = isZero ? [0] : [];
  arrayList?.forEach(element => {
    assignee_ids.push(element?.[key]);
  });
  return assignee_ids?.toString();
};

export const CONVERSATION_CONSTANT = {
  IFRAME_CONTENT: 'EMBEDDABLE',
  IMAGE_FILE: 'IMAGE',
  CAROUSEL_CONTENT: 'CAROUSEL',
  VIDEO_FILE: 'VIDEO',
  AUDIO_FILE: 'AUDIO',
  CODE_SNIPPET: 'CODE SNIPPET',
};

export const CONVERSATION_TYPE = {
  AUTO_REPLY: 'AUTO_REPLY',
  BOT: 'BOT',
  LIVE_CHAT: 'LIVE_CHAT',
};

export const SOCKET_CONFIG = {
  SOCKET_EVENTS: {
    CONNECT: 'connect', // Event Desc: Initial Connection
    DISCONNECT: 'disconnect', // Event Desc: Manual/Auto Disconnection
    RECONNECT: 'reconnect', // Event Desc: Manual/Auto Re-connection
    AGENT_JOIN: 'agent_join', // Event Desc: Other user joined the chat room
    AGENT_LEAVE: 'agent_leave', // Event Desc: Other user left the chat room
    AGENT_TYPING: 'agent_typing', // Event Desc: Other user is typing
    ASSIGNEE_CHANGED: 'assignee', // Event Desc: Assignment changed
    MESSAGE: 'message', // Event Desc: Send/Receive Message
    CONVERSATION_CREATE: 'conversation_create', // Event Desc: New Conversation Initiation
    VISITOR_TYPING: 'visitor_typing', // Event Desc: Is user typing something
    STATUS_CHANGED: 'status', // Event Desc: Initial Status either user joined the conversation
    USER_STATUS: 'user_status', // implemented// Event Desc: Status of user i.e Online/Away/Offline
    MESSAGE_READ: 'message_read', // Event Desc: Message Read status i.e Read/Unread
    NOTE: 'note', // Event Desc: Special Purpose Message
    CUSTOMER_PROFILE: 'variables', // Event Desc: -----------------------N/A
    SWITCH_CONVERSATION_MODE: 'switch-conversation-mode', // Event Desc: -----------------------N/A
  },
  TRIGGER_EVENTS: {
    AUTO_OPEN: 'auto_open',
    AUTO_OPEN_NEW: 'auto-open',
    POPUP_MESSAGE: 'popup_message',
  },
};

export const AVATAR_COLORS = {
  A: '#47c8d0',
  B: '#4646a5',
  C: '#dc884c',
  D: '#547d7d',
  E: '#614051',
  F: '#47bb478c',
  G: '#989898',
  H: '#ea78b1',
  I: '#a15cd4',
  J: '#00A86B',
  K: '#c5bb5b',
  L: '#f08080',
  M: '#b76e6e',
  N: '#4d4d82',
  O: '#808000',
  P: '#cd853f',
  Q: '#b9af93',
  R: '#f36464',
  S: '#63c3ea',
  T: '#008080',
  U: ' #120a8f8c',
  V: '#ee82ee',
  W: '#eac783',
  X: '#b1b011',
  Y: '#a5ce52',
  Z: '#506022',
};

export const DEFAULT_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQBAMAAACAGwOrAAAAG1BMVEXHx8d1dXWenp68vLyoqKh/f3+JiYmysrKTk5O6M/JeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEhUlEQVR42u3YzXPTRhgHYGElcY6I2CZHJ9Dh6hAKOeaD0h5xwYQjhuYeF2h6xAMZ/u3uSrJiYYcxM53pKH2eGcdOtNrJ/mb16pWTBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+I+l50/7j1r3y/XDh0Nq9H59tN7faiRu3mxbWeq94v/VmcTF3f3y2LLd1U8PKDv/NsJ7/wOAGhjV6LqyVl3d6R1irL286ENbKy9t7I6yVl9fqXIXV3r0/qIfVHqTHJ6EnOn6Q/+3R7u5J0SQd3z9P9os/PVgaVjlX2U29z1/hrEE5z0kjw0pGVVitrDvcHtTCmhxOR1k/mXazd2Hhl7Ex+BwjGHfPuodn4dNBNhq+XBLWbK5Wvj/bnfgKZ2V5iQwnZe8aGdakX4aVjj8n6c5pPaxnp8lBZ6OTtEJD1n4dttXfsTObhHweboew2qOTpD3uL4RVzTUf1uS0GJsO74UPfzUxrM2tMqw8nXQ0qIV1Fn4dHYVraTp7Ookf8kGTbpL8/CJ82Ly7EFY111xYd7bjkNvlwc1uE8NKe2VYR/kGmXyqhRV/7MSyNpltn71+spbXuVYIayfvaV9VjchFNJibay6sLF7q8dTi4LSJYeULjmGNi4y2amHFBU7ihtmbhXjrU1mb0xDWqNhsg9rjTn9urvmw8oIfitY4H77XyLDiK4SVbhfPz51aWP1ZTlVzET5sFJfbKF96cHT+zc66mmsurOJv4Wevsa1DsYqQQLtYePlW3Q1nYa3nYaUXT4+qsHqzZCeH39Ssq7nmC3x5UplkM8OKJTuEVS68XMrysJ5loSN4U9wT4si1zn40q2dVWFdzLYT1apZkQ8MKTXwIq1Xe03rXh/W4dzK3CcNNsJVVVaoW1tVcy8LqNDmssA9WCisdnZfFaxrTmYZ7Xedidv/7v4QV2qaVLsOin8q7jO79p5dh4Nrd5c+GN/gyDP3QSgW+qPF78cb58Gz0djA3+NoCX8S5Nh9Wswt82DJxu/RqV9CSsIpWK9wNqw1VbcNvO/hqrmJoaz6ssjlbb2hYaS9vSge1BV8X1jhswurqGw+Wh1XNVUS0Xgtr2uCmNO6WsF3KB52j/rVh3YqDW6F1SIZf3hcpHX1aHlY1V7H3prWwytCbGtZGfG7bjIWm3U2uL/BxuTsfw9CDYWi4viTlOUvCupprHO6gm51aWK148PGrpoZVPORO/9h/Mn1xfVjp8OuTnzp5mU8vPvw2fBfPeTlI/3y7+H1WNdfenf1Ho4taWPHgw9FBU8NKpvk3AuMs+z1JvtOUZtn2YH32kBi/4srP6X5dDKuaqx0+fG7Xw1obZt3+ZuPCqks/vP/+gCe/zv9WFOqqJb1mrvTD+eLB5efcZEeHCauaCGt1O+cyWLnCdWWwgs38+vtlSxKrhJW9fXp82RtIYhWPLrPstYoFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADcFP8AJz/GH1jWWd8AAAAASUVORK5CYII=';

export const CONVERSATION_STATUS = {
  OPEN: 1,
  CLOSED: 2,
};

export const CONVERSATION_STATUS_NAME = {
  OPEN: 'Open',
  CLOSED: 'Closed',
};

export const bytesToSize = bytes => {
  var sizes = ['B', 'KB', 'M', 'G', 'T', 'P'];
  for (var i = 0; i < sizes.length; i++) {
    if (bytes <= 1024) {
      return bytes + ' ' + sizes[i];
    } else {
      bytes = parseFloat(bytes / 1024).toFixed(0);
    }
  }
  return bytes + ' P';
};

export const getMiniFromTime = endData => {
  var now = moment(new Date()); //todays date
  var duration = moment.duration(now.diff(endData));
  var min = duration.asMinutes();
  // console.log('getMiniFromTime', min);
  return min.toFixed(0);
};

// export const showSLA = (itemData, currentTab, slaTime, isSLAEnable) => {
//   if (
//     currentTab === CONVERSATION.CLOSE ||
//     !isSLAEnable ||
//     itemData?.sla_start_at === null
//   ) {
//     return true;
//   }
//   console.log('getMiniFromTime(endData) <= slaTime', getMiniFromTime(itemData?.sla_start_at) <= slaTime);

//   return !getMiniFromTime(itemData?.sla_start_at) <= slaTime;

//   return getMiniFromTime(itemData?.sla_start_at) <= slaTime;
// };
export const showSLA = (endData, slaTime) => {
  // console.log("getMiniFromTime(endData) <= slaTime",getMiniFromTime(endData) <= slaTime)
  // console.log("getMiniFromTime(endData) <= slaTime",slaTime)
  return getMiniFromTime(endData) < slaTime;
};
