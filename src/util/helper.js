import moment from 'moment';
import Toast from 'react-native-root-toast';

export const LONG_DURATION = Toast.durations.LONG;
export const MED_DURATION = 3000;
export const SHORT_DURATION = Toast.durations.SHORT;
export {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from './ResponsiveSize';

export const VALIDATION_REGEX = {
  email: /^\w+([\.-]?\w+)*([+]\w+)?@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
  if (_DEV_) {
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
