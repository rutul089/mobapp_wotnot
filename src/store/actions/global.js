import types from './types';

export const loadingSet = () => ({type: types.API_LOADING_START});

export const loadingUnset = () => ({type: types.API_LOADING_STOP});

export const noInternetConnected = isConnected => ({
  type: types.IS_INTERNET_CONNECTED,
  payload: isConnected,
});

export const updateShowNetworkModal = showModal => ({
  type: types.UPDATE_SHOW_NET_WORK_MODAL,
  payload: showModal,
});

const onError = data => ({type: types.ON_ERROR_RECEIVED, payload: data});

export const userDetail = userData => ({
  type: types.USER_DETAIL,
  payload: userData,
});

export const userProfile = userData => ({
  type: types.USER_PROFILE,
  payload: userData,
});

export const setLabelData = labelData => ({
  type: types.USER_LABEL,
  payload: labelData,
});

export const setUserPreference = labelData => ({
  type: types.USER_PREFERENCE,
  payload: labelData,
});

export const setTeamData = data => ({
  type: types.FETCH_TEAMS,
  payload: data,
});

export const setTeammateData = data => ({
  type: types.FETCH_TEAMMATES,
  payload: data,
});

export const saveReply = data => ({
  type: types.FETCH_SAVE_REPLY,
  payload: data,
});

export const setAssignedChat = data => ({
  type: types.ASSIGNED_CHAT,
  payload: data,
});

export const setConversations = data => ({
  type: types.SET_CONVERSATIONS,
  payload: data,
});

export const setConversationsCount = data => ({
  type: types.SET_CONVERSATIONS_COUNT,
  payload: data,
});
export const setQualifications = data => ({
  type: types.SET_QUALIFICATIONS,
  payload: data,
});

export const clearAllData = data => ({
  type: types.USER_LOGOUT,
});

export const setAccountList = data => ({
  type: types.SET_ACCOUNTS,
  payload: data,
});

export const setFilterConversation = data => ({
  type: types.FILTER_DATA,
  payload: data,
});

export const setClosedConversationCount = data => ({
  type: types.CLOSED_CONVERSATION_COUNT,
  payload: data,
});

export const loadingSetConversations = () => ({type: types.API_LOADING_START});

export const loadingUnsetConversations = () => ({type: types.API_LOADING_STOP});


export const setConversationsHistory = data => ({
  type: types.CONVERSATION_HISTORY,
  payload: data,
});