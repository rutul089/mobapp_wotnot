export function isValidJSON(payload) {
  try {
    JSON.parse(payload);
    return true;
  } catch (e) {
    return false;
  }
}
export const objToString = obj => {
  if (typeof obj === 'object') {
    try {
      return JSON.stringify(obj);
    } catch (err) {
      console.error("can't stringify object in JSONOperations");
    }
  } else {
    console.error('obj that you have try to convert is not actually obj');
  }
};
export const stringToObj = str => {
  let obj = isValidJSON(str) ? JSON.parse(str) : str;
  if (typeof obj === 'object') {
    return obj;
  } else {
    return false;
  }
};

export const findIndex = (array, key, matchKey) => {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === matchKey) {
      index = i;
      return index;
    }
  }
  return index;
};
