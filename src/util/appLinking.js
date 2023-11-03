import {Linking} from 'react-native';
import {LOCAL_STORAGE} from '../constants/storage';
import {getItemFromStorage} from './DeviceStorageOperations';
import {
  navigate,
  navigateAndSimpleResetWithParam,
} from '../navigator/NavigationUtils';

const getAccountIdFromBotId = async botId => {
  // get the account id from bot id
  const agentAccountPref = await getItemFromStorage(
    LOCAL_STORAGE.AGENT_ACCOUNT_LIST,
  );
  for (var index = 0; index < agentAccountPref.account_info.length; index++) {
    for (var j = 0; j < agentAccountPref.account_info[index].bots.length; j++) {
      if (
        parseInt(botId) ===
        parseInt(agentAccountPref.account_info[index].bots[j].bot_lead_id)
      ) {
        return agentAccountPref.account_info[index].id;
      }
    }
  }
  return null;
};

export const urlRedirect = async (url, title) => {
  if (!url) return;
  let path = getRouteFromUrl(url);
  let itemData = {};
  if (
    path &&
    path.startsWith('account/') &&
    (path.includes('/assigned/') ||
      path.includes('/unassigned/') ||
      path.includes('/me/'))
  ) {
    const splitPath = path.split('/');
    const accountSplitPath = path.split('account/');
    const accountId =
      accountSplitPath && accountSplitPath.length > 1
        ? accountSplitPath[1].split('/')[0]
        : null;
    const botSplitPath = path.split('/bot/');
    const botId =
      botSplitPath && botSplitPath.length > 1
        ? botSplitPath[1].split('/')[0]
        : null;
    const conversationKey = splitPath[splitPath.length - 1].split('?')[0];
    console.log('if---------->1', {
      conversationKey: conversationKey,
      botId: botId,
      accountId: accountId,
      title: title,
      thread_key: conversationKey,
      bot_id: botId,
    });
    itemData = {
      conversationKey: conversationKey,
      botId: botId,
      accountId: accountId,
      title: title,
      thread_key: conversationKey,
      bot_id: botId,
    };
  } else if (
    path &&
    path.startsWith('app/') &&
    (path.includes('/assigned/') ||
      path.includes('/unassigned/') ||
      path.includes('/me/'))
  ) {
    const splitPath = path.split('/');
    const botSplitPath = path.split('app/');
    const botId =
      botSplitPath && botSplitPath.length > 1
        ? botSplitPath[1].split('/')[0]
        : null;
    const conversationKey = splitPath[splitPath.length - 1].split('?')[0];
    const accountId = await getAccountIdFromBotId(botId);
    console.log('else-if-------->2', {
      conversationKey: conversationKey,
      botId: botId,
      accountId: accountId,
    });

    if (accountId) {
      itemData = {
        thread_key: conversationKey,
        botId: botId,
        accountId: accountId,
        title: title,
        fromNotification: true,
        navigateTo: 'ConversationScreen',
      };
    } else {
      itemData = {
        title: title,
        fromNotification: true,
        navigateTo: 'MainNavigator',
      };
    }
  }
  if (itemData?.conversationKey) {
    navigateAndSimpleResetWithParam('ConversationScreen', 0, {
      itemData,
      fromNotification: true,
    });
  } else {
    navigateAndSimpleResetWithParam('MainNavigator', 0, {
      fromNotification: true,
    });
  }

  return itemData;
};

const getRouteFromUrl = url => {
  let regEx = /^(?:www\.)?(.*?):\/\//gim;
  let path = url.replace(regEx, '');
  console.log('path = ' + path);
  let regEx2 = /^(.*?\/)/;
  if (path.match(regEx2)) {
    let route = path.replace(regEx2, '');
    console.log('route', route);
    return route;

    //extracts domain
    url = path.match(regEx2);
    let domainUrl = url[0].replace('/', '');
    console.log('domainUrl = ', domainUrl);
  }
};
