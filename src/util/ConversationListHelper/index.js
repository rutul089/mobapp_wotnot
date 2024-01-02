import images from '../../assets/images';
import {findIndex, isValidJSON} from '../JSONOperations';
import {
  CONVERSATION_CONSTANT,
  VALIDATION_REGEX as REGEX_PATTERNS,
} from '../helper';

export function isValidArray(text) {
  return Object.prototype.toString.call(text) === '[object Array]';
}
export const parsemsg = message => {
  let lastConversation = '';
  let payload = JSON.parse(message);
  if (payload['type'] === 'cardview') {
    lastConversation = CONVERSATION_CONSTANT.CAROUSEL_CONTENT;
  } else if (payload['type'] === 'options') {
    lastConversation = messageParser(payload['text']);
  } else if (
    payload['type'] === 'calendar' ||
    payload['type'] === 'custom_phone_input'
  ) {
    lastConversation = messageParser(JSON.parse(payload['text'])['title']);
  } else if (payload['type'] === 'text' || payload['type'] === 'file') {
    lastConversation = messageParser(payload['text']);
    if (
      payload['type'] === 'text' &&
      isValidJSON(lastConversation.replace(/\\/gim, '')) &&
      isValidArray(JSON.parse(lastConversation.replace(/\\/gim, '')))
    ) {
      let messagesList = JSON.parse(lastConversation.replace(/\\/gim, ''));
      lastConversation = messageParser(
        messagesList[messagesList.length - 1]['text'],
      )
        ? messageParser(messagesList[messagesList.length - 1]['text'])
        : messageParser(messagesList[messagesList.length - 2]['text']);
    } else if (
      payload['type'] === 'file' &&
      isValidJSON(payload['text']) &&
      JSON.parse(payload['text'])['version'] === 2
    ) {
      lastConversation = messageParser(JSON.parse(payload['text'])['message']);
    }
  } else if (payload['type'] === 'form') {
    lastConversation = messageParser(JSON.parse(payload['text'])['message']);
  } else if (payload['type'] === 'form.response') {
    if (payload['fields']) {
      const fields = payload['fields'];
      lastConversation = fields[0]['label'] + ': ' + fields[0]['value'];
    } else {
      lastConversation = 'form';
    }
  } else if (payload['type'] === 'slider') {
    lastConversation = messageParser(JSON.parse(payload['text'])['message']);
  } else if (payload['type'] === 'slider.response') {
    lastConversation = messageParser(payload['text']);
  } else if (payload['type'] === 'file.response') {
    if (payload['files']) {
      const files = payload['files'];
      lastConversation = messageParser(
        files[0].filename ? files[0].filename : files[0],
      );
    } else {
      lastConversation = messageParser('file');
    }
  } else {
    lastConversation = messageParser(message);
  }
  return lastConversation;
};

export function checkTime(i) {
  return i < 10 ? '0' + i : i;
}

export function getSeconds(now, timestamp) {
  var second = Math.floor((now - timestamp) / 1000);
  if (second > 0) {
    return second;
  } else {
    return Math.floor((timestamp - now) / 1000);
  }
}

export function getTimeStamp(
  conversationTimestamp,
  currentUTCTimestamp,
  isUTC,
) {
  let now = currentUTCTimestamp ? new Date(currentUTCTimestamp) : new Date();
  if (isUTC !== undefined && isUTC === true) {
    now.setDate(new Date().getUTCDate());
    now.setMonth(new Date().getUTCMonth());
    now.setFullYear(new Date().getUTCFullYear());
    now.setHours(
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds(),
    );
  }
  let locale = 'en-us';
  let timestamp = new Date(conversationTimestamp);
  let month = timestamp.toLocaleString(locale, {
    month: 'short',
  });
  let day = timestamp.getDate();
  let hours = timestamp.getHours();
  hours = checkTime(hours);
  let minute = timestamp.getMinutes();
  minute = checkTime(minute);
  let timestampTooltip = month + ' ' + day + ', ' + hours + ':' + minute;
  let seconds = getSeconds(now, timestamp);
  let minutes = Math.floor(seconds / 60);
  hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let weeks = Math.floor(days / 7);
  let months = Math.floor(days / 30);
  let years = Math.floor(months / 12);
  let timestring = '';
  if (years === 0) {
    if (months === 0) {
      if (weeks === 0) {
        if (days === 0) {
          if (hours === 0) {
            if (minutes === 0) {
              timestring = 'now';
            } else {
              timestring = minutes + 'm';
            }
          } else {
            timestring = hours + 'h';
          }
        } else {
          timestring = days + 'd';
        }
      } else {
        timestring = weeks + 'w';
      }
    } else {
      timestring = months + 'm';
    }
  } else if (years > 0) {
    timestring = years + 'y';
  } else {
    timestring = 'now';
  }
  return {timestamp: timestring, timestampTooltip: timestampTooltip};
}

export function isPatternMatch(msg, pattern) {
  return !!msg.match(pattern);
}

export function isString(o) {
  return (
    typeof o == 'string' || (typeof o == 'object' && o.constructor === String)
  );
}

export function parseJsonMessage(msg) {
  if (msg && typeof msg === 'string') {
    let json_msg = JSON.parse(msg.replace(/\\/gim, ''));
    if (json_msg.hasOwnProperty('title') && json_msg.title !== '') {
      return messageParser(json_msg.title);
    } else if (!isNaN(msg)) {
      return msg.replace(REGEX_PATTERNS.HTML_TAGS, '');
    } else {
      return CONVERSATION_CONSTANT.CODE_SNIPPET;
    }
  }
}
export const messageParser = msg => {
  console.log("messageParser",msg)
  return msg
  if (!msg) return;
  if (isValidJSON(msg?.replace(/\\/gim, ''))) {
    return parseJsonMessage(msg);
  }

  if (isPatternMatch(msg, REGEX_PATTERNS.IMAGE_TAG)) {
    return CONVERSATION_CONSTANT.IMAGE_FILE;
  }

  if (isPatternMatch(msg, REGEX_PATTERNS.VIDEO_TAG)) {
    return CONVERSATION_CONSTANT.VIDEO_FILE;
  }

  if (isPatternMatch(msg, REGEX_PATTERNS.AUDIO_TAG)) {
    return CONVERSATION_CONSTANT.AUDIO_FILE;
  }

  if (isPatternMatch(msg, REGEX_PATTERNS.IFRAME_TAG)) {
    const iframe_src = getMatchResults(REGEX_PATTERNS.IFRAME_SRC, msg, true);
    return isString(iframe_src) &&
      isPatternMatch(iframe_src, REGEX_PATTERNS.SOURCE_YOUTUBE)
      ? CONVERSATION_CONSTANT.VIDEO_FILE
      : CONVERSATION_CONSTANT.IFRAME_CONTENT;
  }

  return unEscape(msg);
};

export const getBotIds = (agentAccountList, userPreference) => {
  let bots = [];
  agentAccountList &&
    agentAccountList.account_info.forEach(info => {
      if (userPreference.account_id === info.id) {
        bots = [...bots, ...info.bots];
      }
    });
  let bot_ids = bots.map(bot => bot.bot_lead_id);
  return bot_ids;
};

export const getAssigneeList = userList =>
  userList &&
  userList.users.map(user => (user.user_id ? user.user_id : user.id));

export const getMessage = item => {
  let message = null;
  let data = isValidJSON(item.message) ? JSON.parse(item.message) : null;
  if (
    data &&
    data.version &&
    data.version === 2 &&
    data.type === 'send_message' //cardview
  ) {
    let messageItem = isValidJSON(data.text) ? JSON.parse(data.text) : null;
    if (messageItem) {
      if (messageItem.type === 'text') {
        message = messageItem.text;
      } else if (messageItem.type === 'info') {
        message = messageItem?.info?.title ?? 'info';
      } else {
        let fileItem = messageItem.video
          ? messageItem.video
          : messageItem.document
          ? messageItem.document
          : messageItem.audio
          ? messageItem.audio
          : messageItem.image
          ? messageItem.image
          : null;

        if (fileItem) {
          message = `${fileItem.file_name}`;
        } else {
          message = 'File';
        }
      }
    }
  } else if (
    (data?.version === 1 && data.type === 'text') ||
    data?.type === 'options'
  ) {
    message = messageParser(data?.text);
  } else if (data?.type === 'text') {
    message = data.text;
  } else if (
    data &&
    data.version === 2 &&
    data.type === 'file.response' &&
    data?.files &&
    data?.files?.length > 0
  ) {
    message = data?.files?.[0]?.filename;
  } else if (data && data?.type === 'slider.response') {
    message = data?.text;
  } else if (data && data?.type === 'slider') {
    let messageItem = JSON.parse(data?.text);
    message = messageItem?.message;
  } else if (
    data &&
    data?.type === 'cardview' &&
    data?.text &&
    data?.text?.length > 0
  ) {
    message = 'CAROUSEL';
  } else if (data && data?.type === 'calendar' && data?.text) {
    let validData = JSON.parse(data?.text);
    message = validData && validData?.title ? validData?.title : 'Calendar';
  } else if (
    data &&
    (data.type === 'form' || data.type === 'file') &&
    data?.text
  ) {
    let messageItem = JSON.parse(data?.text);
    message = messageItem?.message;
  } else if (
    data &&
    data?.type === 'form.response' &&
    data?.fields &&
    data?.fields?.length > 0
  ) {
    message = `${data?.fields?.[0]?.label}:${data?.fields?.[0]?.value}`;
  } else if (data && data?.type === 'appointment_booking') {
    message = "Select your slot"
  } else {
    message = item.message;
  }

  return item.newNote ? messageParser(item.newNote) : messageParser(message);
};

export const unEscape = htmlStr => {
  let text = htmlStr.replace(REGEX_PATTERNS.HTML_TAGS, '');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&amp;/g, '&');
  return text;
};

export const assigneeChangeText = (data, assignee_id) => {
  let by_id = data['event_payload']['assigned']['by']['id'];
  let by = data['event_payload']['assigned']['by']['name'];
  let changeStatusText = '';

  if (
    data['event_payload']['assigned']['to'] &&
    data['event_payload']['assigned']['to']['id'] != null
  ) {
    let to = data['event_payload']['assigned']['to']['name'];
    let to_id = data['event_payload']['assigned']['to']['id'];

    if (assignee_id === by_id && assignee_id === to_id) {
      changeStatusText =
        'You' + ' ' + 'assigned this conversation to' + ' ' + 'yourself.';
    } else if (by_id === to_id) {
      changeStatusText =
        by + ' ' + 'assigned this conversation to ' + ' ' + 'themselves.';
    } else if (assignee_id === by_id) {
      changeStatusText =
        'You' + ' ' + 'assigned this conversation to' + ' ' + to + '.';
    } else if (assignee_id === to_id) {
      changeStatusText =
        by + ' ' + 'assigned this conversation to' + ' ' + 'you.';
    } else {
      changeStatusText =
        by + ' ' + 'assigned this conversation to' + ' ' + to + '.';
    }
  } else {
    if (assignee_id === by_id) {
      changeStatusText = 'You unassigned this conversation.';
    } else {
      changeStatusText = by + ' ' + 'unassigned this conversation.';
    }
  }
  return changeStatusText;
};

export const statusChangeText = (data, assignee_id) => {
  var changeStatusText = '';
  if (data['agent']['name']) {
    var status = data['event_payload']['status']['name'];
    if (status.toLowerCase() === 'open') {
      status = 'opened';
    }
    if (
      data['agent']['name'] === 'System User' &&
      data['event_payload']['status']['name'] === 'Closed'
    ) {
      changeStatusText = 'Conversation closed due to time-out';
    } else if (assignee_id === data['agent']['id']) {
      changeStatusText = 'You ' + status.toLowerCase() + ' this conversation';
    } else {
      changeStatusText =
        data['agent']['name'].trim() +
        ' ' +
        status.toLowerCase() +
        ' this conversation';
    }
  }
  return changeStatusText;
};

export const addNewMessage = (msg, conversation_list, customerProfile) => {
  // console.log('msg?.message_by', msg);
  let newData = [...conversation_list];
  let msgCounts = 0;
  let assignee = msg.assignee ? msg.assignee : msg.agent ? msg.agent : msg.bot;
  if (!msg.is_new_conversation) {
    const index = findIndex(
      conversation_list,
      'thread_key',
      msg.conversation_key,
    );
    if (index !== -1) {
      assignee = conversation_list[index].assignee;
      msgCounts =
        conversation_list[index].unread_messages_count < 0
          ? 0
          : conversation_list[index].unread_messages_count;
      newData.splice(index, 1);
    }
  }
  let newMsg = {
    bot_id: msg.bot_id,
    assignee: assignee,
    title:
      customerProfile &&
      customerProfile.unique_user_key === msg.unique_user_key &&
      customerProfile.title &&
      customerProfile.title !== ''
        ? customerProfile.title
        : msg.conversation_title,
    thread_key: msg.conversation_key,
    message: msg.user
      ? msg.user.message
      : msg.agent
      ? msg.agent.message
      : msg.bot.message,
    last_message_at: msg.user
      ? msg.user.timestamp
      : msg.agent
      ? msg.agent.timestamp
      : msg.bot.timestamp,
    conversation_mode: msg.assignee
      ? msg.assignee.user_type
      : msg.agent
      ? 'LIVE_CHAT'
      : 'BOT',
    unread_messages_count: msgCounts + 1,
    timestamp: 'now',
    status_id: 1,
    unique_user_key: msg.unique_user_key,
    visitor_status: 'online',
    last_message_by: msg?.last_message_by,
    global_channel_name: msg?.global_channel_name,
    browser: msg?.browser,
    city_name: msg?.city_name,
    country_name: msg?.country_name,
  };
  return {newMsg: newMsg, conversationData: newData};
};

export const getGlobalChannelIcon = (channelName, browser) => {
  let channelName1 = channelName?.toLocaleLowerCase();
  switch (channelName1) {
    case 'web':
      if (browser.toLocaleLowerCase()?.includes('chrome')) {
        return images.global_channel_name.ic_chrome;
      } else if (browser.toLocaleLowerCase()?.includes('edge')) {
        return images.global_channel_name.ic_edge;
      } else if (browser.toLocaleLowerCase()?.includes('safari')) {
        return images.global_channel_name.ic_safari;
      } else if (
        browser.toLocaleLowerCase()?.includes('firefox') ||
        browser.toLocaleLowerCase()?.includes('mozilla')
      ) {
        return images.global_channel_name.ic_firefox;
      }
      break;
    case 'sms':
      return images.global_channel_name.ic_sms;
    case 'messenger':
      return images.global_channel_name.ic_facebook;
    case 'whatsApp':
      return images.global_channel_name.ic_whatsapp;
    default:
      return null;
  }
};

// export const getAssigneeName = (users, last_id) => {
//   console.log('users', users);
//   let name = '';
//   users?.forEach(element => {
//     if (element?.id === last_id) {
//       name = element?.display_name;
//       return;
//     }
//   });
//   console.log('------->', name);
//   return name === '' ? '' : `<b>${name}: </b>`;
// };

export const getAssigneeName = (users, last_id) => {
  let name =
    users?.find(element => element?.id === last_id)?.display_name ?? 'Bot';
  return name === '' ? '' : `<b>${name}: </b>`;
};

export const getAddress = item => {
  let text = '';
  if (item?.assignee?.name) {
    text = item?.assignee?.name;
  }

  if (
    item?.assignee?.name &&
    item?.global_channel_name?.toLowerCase() === 'web'
  ) {
    text = text + ' | ';
  }

  if (item?.city_name) {
    text = text + item?.city_name;
  }

  if (item?.country_name && item?.city_name) {
    return (text = text + ',' + item?.country_name);
  }

  if (item?.country_name) {
    return (text = text + item?.country_name);
  }
  return text;
};
