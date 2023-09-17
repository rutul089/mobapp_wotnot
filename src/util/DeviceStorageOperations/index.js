import AsyncStorage from '@react-native-community/async-storage';
import {stringToObj, objToString} from '../JSONOperations';

export const getItemFromStorage = async (
  key,
  shouldValParse = true /*Optional*/,
) => {
  try {
    let val = await AsyncStorage.getItem(key);
    val = shouldValParse && val ? stringToObj(val) : val;
    return val;
  } catch (err) {
    console.log(err);
  }
};

export const setItemToStorage = async (key, payload) => {
  try {
    await AsyncStorage.setItem(
      key,
      typeof payload === 'object' ? objToString(payload) : payload,
    );
  } catch (err) {
    console.log(err);
  }
};
export const removeItemFromStorage = key => {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(key);
    resolve();
  });
};

export const multiGet = async keys => {
  try {
    let data = {};
    await AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let val = store[i][1];
        data = {
          [key]: typeof stringToObj(val) === 'object' ? stringToObj(val) : val,
          ...data,
        };
      });
    });
    return data;
  } catch (err) {
    throw Error(err);
  }
};
