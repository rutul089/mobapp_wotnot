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
        endpoint: `/account/${userID}/labels?account_id=${userID}`,
        method: Method.GET,
      };
    },
    fetchComment: (user_id, message_id) => {
      return {
        endpoint: `/api/v1/users/${user_id}/messages/${message_id}/comments`,
        method: Method.POST,
      };
    },
  };