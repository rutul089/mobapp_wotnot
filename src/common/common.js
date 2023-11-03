import AsyncStorage from '@react-native-community/async-storage';
import {LOCAL_STORAGE} from '../constants/storage';
import {getItemFromStorage} from '../util/DeviceStorageOperations';

export async function getAgentPayload() {
  var agent_account_list = await getItemFromStorage(
    LOCAL_STORAGE.AGENT_ACCOUNT_LIST,
  );
  var userPref = await getItemFromStorage(LOCAL_STORAGE.USER_PREFERENCE);

  return await prepareAgentPayload(userPref, agent_account_list);
}

export async function prepareAgentPayload(userPref, agent_account_list) {
  let agentId = userPref.logged_in_user_id;
  let botIds = [];
  let accountIds = [];
  agent_account_list?.forEach(element => {
    accountIds.push(element.id);
    element.bots.forEach(bots => {
      botIds.push(bots.bot_lead_id);
    });
  });

  return {
    agent_id: agentId,
    bot_id: botIds,
    account_id: accountIds,
    session_id: userPref.session_id,
  };
}

export const getMessageFromEventPayload = (object, receivedConvCreate) => {
  if (object) {
    let parsedMessage = JSON.parse(object['event_payload']['data']);
    let returnObj;
    if (
      parsedMessage.message &&
      (parsedMessage.message.type === 'text' ||
        parsedMessage.message.type === 'button.response' ||
        parsedMessage.message.type === 'slider.response')
    ) {
      let text;
      if (parsedMessage.message.type === 'slider.response') {
        text = JSON.stringify({
          payload: {
            parameter: '',
            value: parsedMessage['message']['data']['body'],
          },
          text: parsedMessage['message']['data']['body'],
          type: parsedMessage.message.type,
        });
      } else {
        text = parsedMessage['message']['data']['body'];
      }
      returnObj = {
        message: JSON.stringify({
          text: text,
          type:
            parsedMessage['message']['type'] === 'slider.response'
              ? 'slider.response'
              : 'text',
        }),
        timestamp: object['event_payload']['timestamp'],
        isSocket: true,
      };
    } else if (parsedMessage.payload && parsedMessage.type === 'phone') {
      returnObj = {
        message: JSON.stringify({
          text: parsedMessage['payload']['text'],
          type: 'text',
        }),
        timestamp: object['event_payload']['timestamp'],
      };
    } else if (
      parsedMessage.payload &&
      (parsedMessage.type === 'name' ||
        parsedMessage.type === 'email' ||
        parsedMessage.type === 'text')
    ) {
      returnObj = {
        message: JSON.stringify({
          payload: {},
          // text: JSON.stringify(parsedMessage['payload']['text']),
          text: parsedMessage['payload']['text'],
          type: 'options',
        }),
        timestamp: object['event_payload']['timestamp'],
      };
    } else if (parsedMessage.payload && parsedMessage.type === 'button') {
      returnObj = {
        message: JSON.stringify({
          type: 'options',
          text: parsedMessage['payload']['title'],
          options: parsedMessage['payload']['buttons'].map((item, idx) => {
            return {callback: null, id: idx, text: item.title};
          }),
        }),
        timestamp: object['event_payload']['timestamp'],
      };
    } else if (
      parsedMessage.payload &&
      (parsedMessage.type === 'carousel' ||
        parsedMessage.type === 'image_carousel')
    ) {
      let textMaker = {
        extra_field: {
          nav_bar: false,
        },
        items: parsedMessage.payload.cards.map(item => {
          let buttons = [];
          if (item.buttons) {
            item.buttons.forEach((element, index) => {
              element['text'] = element['title'];
              element['id'] = index;
              buttons.push(element);
            });
          }
          return {
            action: '',
            image: item.image || '',
            options: buttons || null,
            subtitle: item.description || '',
            text: '',
            title: item.title || '',
          };
        }),
      };

      returnObj = {
        message: JSON.stringify({
          type: 'cardview',
          text: JSON.stringify(textMaker),
        }),
      };
    } else if (parsedMessage.payload && parsedMessage.type === 'slider') {
      returnObj = {
        message: JSON.stringify({
          type: 'slider',
          text: JSON.stringify({
            max: parsedMessage.payload.max,
            min: parsedMessage.payload.min,
            step: null,
            message: parsedMessage.payload.title,
            unit: parsedMessage.payload.unit,
            version: parsedMessage.payload.version,
          }),
        }),
      };
    } else if (parsedMessage.payload && parsedMessage.type === 'calendar') {
      returnObj = {
        message: JSON.stringify({
          text: JSON.stringify({
            title: parsedMessage.payload.title,
            auto_open: parsedMessage.payload.auto_open,
            validation: {
              ...parsedMessage.payload.validation,
            },
          }),
          type: 'calendar',
        }),
      };
    } else if (parsedMessage.payload && parsedMessage.type === 'file_upload') {
      returnObj = {
        message: JSON.stringify({
          type: 'file',
          text: JSON.stringify({
            ...parsedMessage.payload,
            message: parsedMessage.payload.title,
            version: 2,
          }),
        }),
      };
    } else if (
      parsedMessage.message &&
      parsedMessage.message.type === 'file_upload.response'
    ) {
      returnObj = {
        message: JSON.stringify({
          text: JSON.stringify({
            files: parsedMessage.message.data.files,
          }),
          type: 'file.response',
          version: 2,
        }),
      };
    } else if (parsedMessage.payload && parsedMessage.type === 'send_message') {
      if (
        parsedMessage.payload.version &&
        parsedMessage.payload.version === 2 &&
        parsedMessage['payload']['messages'][0]['type'] != 'text'
      ) {
        returnObj = {
          message: JSON.stringify({
            payload: {},
            type: 'send_message',
            version: 2,
            text: JSON.stringify(parsedMessage['payload']['messages'][0]),
          }),
          timestamp: object['event_payload']['timestamp'],
          isSocket: true,
        };
      } else {
        returnObj = {
          message: JSON.stringify({
            payload: {},
            type: 'send_message',
            version: 2,
            text: JSON.stringify(parsedMessage['payload']['messages'][0]),
            // text: parsedMessage['payload']['messages'][0]['text'],
            // type: parsedMessage['payload']['messages'][0]['type'],
          }),
          timestamp: object['event_payload']['timestamp'],
          isSocket: true,
        };
      }
    } else if (
      parsedMessage.payload &&
      (parsedMessage.type === 'form' || parsedMessage.type === 'form.response')
    ) {
      returnObj = {
        message: JSON.stringify({
          type: parsedMessage.type,
          text: JSON.stringify({
            ...parsedMessage.payload,
            message: parsedMessage.payload.title,
          }),
        }),
        timestamp: object['event_payload']['timestamp'],
      };
    } else if (
      parsedMessage.message &&
      parsedMessage.message['type'] === 'form.response'
    ) {
      returnObj = {
        message: JSON.stringify({
          type: parsedMessage.message.type,
          text: JSON.stringify(parsedMessage.message.data),
        }),
        timestamp: object['event_payload']['timestamp'],
      };
    } else if (parsedMessage.payload && parsedMessage.type === 'delay') {
      return;
    }

    if (object['message_by'] && object['message_by'] === 'visitor') {
      returnObj['user'] = {...returnObj};
    } else if (object['message_by'] && object['message_by'] === 'agent') {
      returnObj['agent'] = {
        ...returnObj,
        timestamp: object['event_payload']['timestamp'],
        email: object['agent']['email'],
        name: object['agent']['name'],
        image_url: object['agent']['image_url'],
        id: object['agent']['id'],
      };
    } else if (object['message_by'] && object['message_by'] === 'bot') {
      returnObj['bot'] = {...returnObj};
    }

    if (receivedConvCreate) {
      let result = receivedConvCreate.find(obj => {
        let conversationKey =
          'conversation_key' in obj
            ? obj['conversation_key']
            : obj['thread_key'];
        return conversationKey === object['conversation_key'];
      });
      if (result) {
        let assignee;
        if ('assignee' in result && result['assignee']) {
          assignee = result['assignee'];
          assignee['user_type'] = assignee['type_id'] === 2 ? 'bot' : 'user';
          assignee['user_type_id'] = assignee['type_id'];
        } else if ('agent' in result && result['agent']) {
          assignee = result['agent'];
          assignee['user_type'] =
            assignee['user_type_id'] === 2 ? 'bot' : 'user';
        }
        returnObj['assignee'] = assignee;
        returnObj['bot_id'] = result['bot_id'];
        returnObj['bot_title'] = result['bot_title'] || null;
        returnObj['conversation_title'] =
          result['conversation_title'] || result['title'];
        returnObj['conversation_key'] =
          result['conversation_key'] || result['thread_key'];
        returnObj['global_channel_name'] = object?.['global_channel_name'];
        returnObj['unique_user_key'] =
          result['visitor_key'] || result['unique_user_key'];
        returnObj['last_message_by'] =
          object['message_by'] === 'agent'
            ? object?.agent?.id
            : object['message_by'] === 'bot'
            ? getLasMessageId(object)
            : '';
        returnObj['browser'] = object?.browser
          ? object?.browser
          : object?.visitor?.browser
          ? object?.visitor?.browser
          : '';
        returnObj['city_name'] = object?.browser
          ? object?.browser
          : object?.visitor?.city_name
          ? object?.visitor?.city_name
          : '';
        returnObj['country_name'] = object?.browser
          ? object?.browser
          : object?.visitor?.country_name
          ? object?.visitor?.country_name
          : '';
      }
    }
    return returnObj;
  }
};

export const getLasMessageId = object => {
  let id = '';
  // if (object?.agent && object?.agent?.user_type_id === 1) {
  //   return '';
  // }

  if (object?.agent && object?.agent?.user_type_id === 2) {
    return object?.agent?.id;
  }
};
