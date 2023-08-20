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
