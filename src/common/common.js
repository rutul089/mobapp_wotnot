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
