/* eslint-disable prettier/prettier */
import {isValidJSON} from '../JSONOperations/index';
import {CONVERSATION_TYPE, VALIDATION_REGEX as REGEX_PATTERNS} from '../helper';

export function checkForLinkAndEmailWithinText(message) {
  let email_pattern =
    /(mailto:)?([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  let email_patterns = message.match(email_pattern);
  let email_mail_to_patterns = message.match(
    /<a[^>]*((mailto:)?([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+))[^>]*>.*<\/a>/gim,
  );
  if (email_patterns != null) {
    for (let i = 0; i < email_patterns.length; i++) {
      let isPatternExist = false;
      if (email_mail_to_patterns !== null) {
        for (let j = 0; j < email_mail_to_patterns.length; j++) {
          if (email_mail_to_patterns[j].indexOf(email_patterns[i]) !== -1) {
            isPatternExist = true;
            break;
          }
        }
      }
      if (!isPatternExist) {
        let href_link = email_patterns[i];
        if (email_patterns[i].indexOf('mailto:') === -1) {
          href_link = 'mailto:' + email_patterns[i];
        }
        let text =
          '<a href="' +
          href_link +
          '" target="_blank">' +
          email_patterns[i] +
          '</a>';
        message = message.replace(email_patterns[i], text);
      }
    }
  }
  let withProtocol =
    /(?!<a[^>]*>.*)((?:http(s)?:\/\/)[\w-]+(?:\.[\w]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.%]+)(?!.*[^<]*<\/a>)/gim;
  let withoutProtocol =
    /(?!<a[^>]*>.*)([\w-]+\.(?:[\w]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=%]+)(?!.*[^<]*<\/a>)/gim;
  message = message.replace(
    withProtocol,
    '<a href="$1" target="_blank">$1</a>',
  );
  message = message.replace(
    withoutProtocol,
    '<a href="http://$1" target="_blank">$1</a>',
  );
  return message;
}

export function checkMessageContentType(message) {
  let imgTag = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/gim;
  let iframeTag = /<iframe\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/gim;
  let videoTag = /<\s*video[^>]*>(.*?)<\s*\/\s*video>/g;
  let audioTag = /<\s*audio[^>]*>(.*?)<\s*\/\s*audio>/g;
  if (
    (typeof message === 'string' || typeof message === 'number') &&
    message !== ''
  ) {
    if (
      !message.match(imgTag) &&
      !message.match(iframeTag) &&
      !message.match(videoTag) &&
      !message.match(audioTag)
    ) {
      message = checkForLinkAndEmailWithinText(message);
    }
    return message;
  }
}

export function getFileName(file) {
  return file.split('.')[0];
}

export function getFileExtension(file) {
  return file.split('.').pop();
}

export function getExtensionIcon(ext) {
  switch (ext) {
    case 'csv':
      return 'exclefile1';
    case 'xlsx':
      return 'exclefile1';
    case 'xls':
      return 'exclefile1';
    case 'ppt':
      return 'pptfile1';
    case 'pptx':
      return 'pptfile1';
    case 'docx':
      return 'wordfile1';
    case 'doc':
      return 'wordfile1';
    case 'docm':
      return 'wordfile1';
    case 'dotx':
      return 'wordfile1';
    case 'pdf':
      return 'pdffile1';
    case 'mp4':
    case 'mp3':
      return 'play';
    default:
      return 'file1';
      return 'unknowfile1';
  }
}

export function getUserAcronym(username) {
  var acronym = username.substring(0, 2).toUpperCase();
  return acronym;
}

export function getAgentAcronym(data) {
  if (data.name) {
    var str = data.name;
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('').toUpperCase();
    return acronym;
  } else {
    var email = data && data.email ? data.email : 'AG'; // if email key not exist we set AG text as fallback
    var acronym = email.charAt(0).toUpperCase();
    return acronym;
  }
}

export function isTextComponentContainImage(text) {
  return REGEX_PATTERNS.IMAGE_SRC.test(text);
}

export function isValidHttpUrl(string) {
  var res = string.match(REGEX_PATTERNS.HTTP_URL);
  return res !== null;
}

export function isValidEmail(string) {
  var res = string.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
  return res !== null;
}

export function userFileResponseElement(el) {
  let message = el.user['message'];
  message = JSON.parse(message.text);
  let file_list = [];
  message['files'].map(file => {
    if (
      file['mime_type'] === 'image/*' ||
      file['mime_type'] === 'image/jpeg' ||
      file['mime_type'] === 'image/png' ||
      file['mime_type'] === 'image/jpg'
    ) {
      file_list = [{...file, type: 'img'}, ...file_list];
    } else {
      file_list = [{...file, type: 'file'}, ...file_list];
    }
  });
  return file_list;
}

export function getStatusChangeMsgText(el, assignee_id) {
  console.log("el------>",el)
  console.log("assignee_id------>",el)
  if (el.agent['name']) {
    var name = el.agent['name'];
    var status = el.agent['status']['name'];
    if (status.toLowerCase() == 'open') {
      status = 'opened';
    }
    if (name === 'System User' && el.agent['status']['name'] === 'Closed') {
      return 'Conversation closed due to time-out. ';
    } else if (
      assignee_id == el.agent['id'] ||
      assignee_id == el.agent['user_id']
    ) {
      return 'You' + ' ' + status.toLowerCase() + ' this conversation. ';
    }
    return name + ' ' + status.toLowerCase() + ' this conversation. ';
  }
}

export function getAssigneeChangeMsgText(el, assignee_id) {
  var assigned = el.agent['assigned'];

  if (assigned != null) {
    var by = assigned['by']['name'] || assigned['by']['email'];
    var by_id = assigned['by']['id'];

    if (assigned['to'] && assigned['to']['id'] != null) {
      var to = assigned['to']['name'] || assigned['to']['email'];
      var to_id = assigned['to']['id'];

      if (assignee_id == by_id && assignee_id == to_id) {
        return 'You' + ' assigned this conversation to ' + 'yourself. ';
      } else if (by_id == to_id) {
        return by + ' ' + 'assigned this conversation to ' + 'themselves. ';
      } else if (assignee_id == by_id) {
        return 'You' + ' assigned this conversation to' + ' ' + to + '. ';
      } else if (assignee_id == to_id) {
        return by + ' ' + ' assigned this conversation to' + ' ' + 'you. ';
      } else {
        return by + ' ' + ' assigned this conversation to' + ' ' + to + '. ';
      }
    } else {
      if (assignee_id == by_id) {
        return 'You' + ' ' + ' unassigned this conversation. ';
      } else {
        return by + ' ' + 'unassigned this conversation. ';
      }
    }
  } else {
    return null;
  }
}

export function getAgentDetails(item, users) {
  let agentWithAccountDetails = item;
  let agent_details = users[item['agent']['created_by']]
    ? users[item['agent']['created_by']]
    : null;
  if (
    agentWithAccountDetails.agent.assigned &&
    (agentWithAccountDetails.agent.assigned.by.created_by ||
      agentWithAccountDetails.agent.assigned.to.created_by)
  ) {
    let agent_data = agentWithAccountDetails.agent;
    let assignedById = users[agent_data['assigned']['by']['created_by']];
    let assignedToId = users[agent_data['assigned']['to']['created_by']];
    let assigned = {};
    assigned['by'] = {};
    assigned['to'] = {};
    assigned['by']['id'] = parseInt(agent_data['assigned']['by']['created_by']);
    assigned['to']['id'] = assignedToId
      ? parseInt(agent_data['assigned']['to']['created_by'])
      : null;
    assigned['by']['name'] = assignedById ? assignedById['name'] : null;
    assigned['to']['name'] = assignedToId ? assignedToId['name'] : null;
    assigned['by']['email'] = assignedById?.email
      ? assignedById['email']
      : null;
    assigned['to']['email'] = assignedToId ? assignedToId['email'] : null;
    assigned['by']['image_url'] = assignedById
      ? assignedById['image_url']
      : null;
    assigned['to']['image_url'] = assignedToId
      ? assignedToId['image_url']
      : null;
    assigned['by']['user_type'] = assignedById
      ? assignedById['user_type']
      : null;
    assigned['to']['user_type'] = assignedToId
      ? assignedToId['user_type']
      : null;
    assigned['by']['user_type_id'] = assignedById
      ? assignedById['user_type_id']
      : null;
    assigned['to']['user_type_id'] = assignedToId
      ? assignedToId['user_type_id']
      : null;
    agentWithAccountDetails['agent'] = {
      timestamp: agent_data.timestamp,
      assigned: assigned,
    };
  }
  if (agent_details) {
    agentWithAccountDetails.agent = {
      ...agentWithAccountDetails.agent,
      ...agent_details,
    };
  }
  return agentWithAccountDetails;
}
export function getChatMsgUserType(item) {
  return item?.agent
    ? item?.agent
    : item?.auto_reply
    ? item?.auto_reply
    : item?.user
    ? item?.user
    : null;
}

export function getChatMsgType(item) {
  let chatItem = getChatMsgUserType(item);
  // console.log('chatItem', chatItem);
  // console.log("item",item)
  let msgType = chatItem?.type
    ? chatItem.type
    : chatItem.message
    ? typeof chatItem.message === 'string' && isValidJSON(chatItem.message)
      ? JSON.parse(chatItem.message).type
      : chatItem.message.type
    : chatItem.note
    ? 'note'
    : chatItem.assigned
    ? 'assigned'
    : chatItem.status
    ? 'status'
    : null;

  if (msgType === 'send_message') {
    let data = isValidJSON(chatItem?.message?.text)
      ? JSON.parse(chatItem?.message?.text)
      : null;
    return data?.type;
  }

  if(msgType === 'options'){
    return 'options';
    let data = isValidJSON(chatItem?.message?.text)
      ? JSON.parse(chatItem?.message?.text)
      : null;
  }

  if (
    chatItem &&
    chatItem.message &&
    chatItem.message.version &&
    chatItem.message.version === 2
  ) {
    // let data = JSON.parse(JSON.stringify(chatItem?.message?.text)) ?? null;
    let data = JSON.parse(JSON.stringify(chatItem?.message?.text)) ?? null;
    return data.type === 'text' ||
      data.type === 'image' ||
      data.type === 'send_message'
      ? data.type
      : data.type === 'video' ||
        data.type === 'audio' ||
        data.type === 'document'
      ? 'file'
      : null;
  }
  return msgType === 'text' &&
    isTextComponentContainImage(chatItem.message.text)
    ? 'image'
    : msgType;
}

export function getFormChatItemWithResponse(index, data, currentItem) {
  let newItem = null;
  if (index > 0) {
    for (let i = index - 1; i > -1; i--) {
      let msgType = '';
      try {
        msgType = data[i]['user']['message']['type'];
      } catch {
        msgType = '';
      }
      if (msgType === 'form.response') {
        newItem = {
          ...data[i],
          currentText: currentItem.agent.message.text,
        };
        return newItem;
      }
    }
  }
}

export function filterOperatorList(
  assignee_list,
  conversationMode,
  botMode,
  assigneeId,
) {
  let filteredList = [];
  // this condition removes the NLP bot if added from the list for bot mode other than auto_reply and for conversation for which human handover is done.
  // if (botMode !== CONVERSATION_TYPE.AUTO_REPLY && conversationMode !== CONVERSATION_TYPE.BOT) {
  //     filteredList = assignee_list.filter(user => user.user_type !== 'bot');
  // }
  if (
    botMode === CONVERSATION_TYPE.BOT &&
    conversationMode === CONVERSATION_TYPE.BOT
  ) {
    // if assignee is is null and bot type is live chat means conversation is unassinged so need to show all user list
    for (let i = 0; i < assignee_list.length; i++) {
      if (
        (assignee_list[i].name && assignee_list[i].name === 'Sequential Bot') ||
        (assignee_list[i].display_name &&
          assignee_list[i].display_name === 'Sequential Bot')
      ) {
        filteredList.push(assignee_list[i]);
      }
    }
  } else {
    for (let i = 0; i < assignee_list.length; i++) {
      if (
        (assignee_list[i].name &&
          assignee_list[i].name !== 'Sequential Bot' &&
          assignee_list[i].user_type &&
          assignee_list[i].user_type === 'user') ||
        (assignee_list[i].display_name &&
          assignee_list[i].display_name !== 'Sequential Bot' &&
          assignee_list[i].user_type &&
          typeof assignee_list[i].user_type === 'object' &&
          assignee_list[i].user_type.type === 'user')
      ) {
        filteredList.push(assignee_list[i]);
      }
    }
  }

  return filteredList;
}

export const getChatMsgCountWithoutStatusMsg = chatMsgs => {
  let cnt = 0;
  for (let i = 0; i < chatMsgs.length; i++) {
    if (
      chatMsgs[i].agent &&
      !chatMsgs[i].agent.status &&
      !chatMsgs[i].agent.assigned
    ) {
      cnt++;
    } else {
      cnt++;
    }
  }
  return cnt;
};

export const convertTextMessage = msg => {
  let message =
    msg.type === 'text'
      ? checkMessageContentType(msg.text ? msg.text : msg)
      : msg.text
      ? msg.text
      : msg;
  if (msg.type === 'file') {
    message = JSON.parse(message).message;
  } else {
    try {
      message = JSON.parse(msg);
      message =
        message.type === 'slider.response'
          ? message.text
          : message.type === 'file.response'
          ? message.files[0]
          : message.message
          ? message.message
          : checkMessageContentType(message);
    } catch (err) {
      // print error
    }
  }
  return message;
};
