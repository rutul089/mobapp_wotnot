import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

export const openImagePicker = async onResponse => {
  let options = {
    mediaType: 'photo',
    quality: 1.0,
    storageOptions: {
      skipBackup: true,
    },
    json: true,
  };
  const res = await ImagePicker.launchImageLibrary(options, onResponse);
  let _tempRes = res.assets[0];
  let response = {
    uri: _tempRes['uri'],
    type: _tempRes['type'],
    fileName: _tempRes['fileName'],
    fileSize: _tempRes['fileSize'],
    isPdf: false,
  };
  return onResponse(response);
};

export const requestDocument = async onResponse => {
  try {
    const res = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
        DocumentPicker.types.csv,
        DocumentPicker.types.pdf,
        DocumentPicker.types.images,
        DocumentPicker.types.ppt,
        DocumentPicker.types.pptx,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
        DocumentPicker.types.xlsx,
      ],
    });
    let _tempRes = res?.[0];
    let response = {
      uri: _tempRes['uri'],
      type: _tempRes['type'],
      name: _tempRes['name'],
      size: _tempRes['size'],
    };
    // console.log('requestDocument_', JSON.stringify(response));
    return onResponse(response);
  } catch (err) {
    return onResponse(null);
    if (DocumentPicker.isCancel(err)) {
      return onResponse(null);
    } else {
      throw err;
    }
  }
};
