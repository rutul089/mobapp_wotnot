import {Method} from '../apiService';

export const apiConfig = {
  productionBaseURL: 'https://app.wotnot.io' /*release build*/,
  testingBaseURL: 'https://app.wotnot.io' /*inteneal testing*/,
  developmentBaseURL: 'https://app.wotnot.io' /*for client test*/,
  alphaBaseURL: 'https://app.wotnot.io',
};

export const endPoints = {
  login: {
    endpoint: '/v1/user-login',
    method: Method.POST,
  },
  fetchLabel: userID => {
    return {
      endpoint: `/v1/account/${userID}/labels?account_id=${userID}`,
      method: Method.GET,
    };
  },
  fetchUserPreference: {
    endpoint: '/v1/user-preference',
    method: Method.POST,
  },
  fetchTeam: (userID, offset) => {
    return {
      endpoint: `/v1/accounts/${userID}/teams?order_by=name&order=asc&limit=20&offset=${offset}`,
      method: Method.GET,
    };
  },
  fetchTeammates: userID => {
    return {
      endpoint: `/v1/account/${userID}/users`,
      method: Method.POST,
    };
  },
  fetchSavedReply: (userID, from, limit) => {
    return {
      endpoint: `/v1/account/${userID}/saved-replies?&from=${from}&limit=${limit}&sort_type=desc&sort_by=created_at`,
      method: Method.GET,
    };
  },
  fetchConversation: (account_id, status_id, limit) => {
    return {
      endpoint: `/v1/accounts/${account_id}/conversations?status_ids=${status_id}&is_order_by_asc=false&limit=${limit}`,
      method: Method.GET,
    };
  },
  conversationSummary: account_id => {
    return {
      endpoint: `/v1/accounts/${account_id}/conversations/summary`,
      method: Method.GET,
    };
  },
  fetchQualifications: conversation_key => {
    return {
      endpoint: `/v2/conversations/${conversation_key}/qualifications`,
      method: Method.GET,
    };
  },
  saveLabel: conversation_key => {
    return {
      endpoint: `/v1/conversations/${conversation_key}/labels`,
      method: Method.PUT,
    };
  },
  deleteLabel: (conversation_key, label_id) => {
    return {
      endpoint: `/v1/conversations/${conversation_key}/labels?ids=${label_id}`,
      method: Method.DELETE,
    };
  },
  fetchConversationBySearch: (account_id, query) => {
    return {
      endpoint: `/v1/accounts/${account_id}/conversations?${query}`,
      method: Method.GET,
    };
  },
  resetPwdLink: {
    endpoint: '/v1/reset-password-link',
    method: Method.POST,
  },
  twoFactorCode: {
    endpoint: '/v1/sessions/two-factor',
    method: Method.GET,
  },
  verifyOtp: {
    endpoint: '/v1/user/totp/verify',
    method: Method.POST,
  },
  recoveryCode: {
    endpoint: '/v1/user/authenticate/recovery-code',
    method: Method.POST,
  },
};

// export const WebSocketURL= "ws.wotnot.io" // PROD
// export const WebSocketURL = "ws.test.wotnot.io" // TEST
export const WebSocketURL = "ws.dev.wotnot.io" //DEV



// Production: https://ws.wotnot.io/?user_type=agent 
// Staging: https://ws.test.wotnot.io/?user_type=agent 
// Development: https://ws.dev.wotnot.io/?user_type=agent