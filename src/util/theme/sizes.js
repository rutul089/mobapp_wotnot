import {widthPercentageToDP as wp} from '../ResponsiveSize';

const containers = {
  xs: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const image = {
  '2xs': wp('2.7'), // 10
  xs: wp('3.2'), //12
  sm: wp('3.6'), //14
  md: wp('4.1'), //16
  lg: wp('4.6'), //18
  xl: wp('5.1'), //20
  '2xl': wp('6.4'), //25
  '3xl':  wp('7.6'), //30
  '4xl': wp('10.2'), //40
  '5xl': wp('12.7'), //50
  '6xl':  wp('15.3'), //60
  '7xl':  wp('20.4'), //80
  '8xl': wp('25.5'), //100
};

const icons = {
  '2xs': wp('3.2'), //12
  xs: wp('3.6'), //14,
  sm: wp('4.1'), //16
  md: wp('4.6'), //18
  lg: wp('5.1'), //20,
  xl: wp('5.6'), //22,
  '2xl': wp('6.3'),// 24
  '3xl': wp('6.6'), // 26
  '4xl': wp('7.1'), // 28
  '5xl': wp('7.6'), // 30
  '6xl': wp('8.2'), // 32
  '7xl': wp('8.7'), // 34
  '8xl': wp('9.2'), // 36
  '9xl': wp('9.7'), // 38
  '10xl': wp('10.2'), // 40
  '11xl': wp('10.7'), // 42
  '12xl': wp('11.2'), // 44
  '13xl': wp('11.7'), // 46
  '14xl': wp('12.2'), // 48
  '15xl': wp('12.7'), // 50
};

const borders = {
  '2xs': 2,
  xs: 3,
  sm: wp('2.1'), // 9
  md: wp('2.6'), // 10
  lg: wp('3.2'), // 12
  xl: wp('4.1'), //16
  '2xl': wp('7.6'), // 30
};

const radius = {
  none: 0,
  rounded: 10,
  full: 9999,
};

const spacing = {
  '2xs': 4,
  xs: 8,
  sm: 15,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 64,
  '4xl': 92,
  ph: 20,
  pv: 20,
  tableRow: 54,
  tableHeader: 56,
};

const sizes = {
  icons,
  spacing,
  containers,
  image,
  borders,
  radius,
  borderRadius: 10,
  borderWidth: 2,
  ...{
    '3xs': 50,
    '4xl': 60,
    '2xs': 120,
    xs: 160,
    sm: 162,
    md: 164,
    lg: 196,
    xl: 325,
    '2xl': 335,
    '3xl': 375,
  },
};

export default sizes;
