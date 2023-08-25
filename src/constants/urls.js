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
  conversationSummary: (account_id) => {
    return {
      endpoint: `/v1/accounts/${{account_id}}/conversations/summary`,
      method: Method.GET,
    };
  },
};
