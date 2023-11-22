import colors from '../../../theme/colors';
import sizes from '../../../theme/sizes';
import typography from '../../../theme/typography';
import {Dimensions, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
export const scaleWidth = SCREEN_WIDTH / 360;
export const scaleHeight = SCREEN_HEIGHT / 800;
export const _scale = Math.min(scaleWidth, scaleHeight);

const normalize = size => {
  return Math.ceil(size * _scale);
};

const isIos = () => {
  return Platform.OS === 'ios';
};

const theme = {
  colors,
  sizes,
  typography,
  normalize,
  isIos,
};

export {theme};
export default theme;
