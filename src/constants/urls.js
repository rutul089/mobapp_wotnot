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
};
