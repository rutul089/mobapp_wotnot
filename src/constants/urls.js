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
    }
  };