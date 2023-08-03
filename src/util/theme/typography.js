import {widthPercentageToDP as wp} from '../ResponsiveSize';

const typography = {
  fontWeights: {
    normal: '400',
    semibold: '600',
    medium: '500',
    bold: '700',
  },
  lineHeights: {
    '2xs': wp('4'), // 15
    xs: wp('4.6'), //18
    sm: wp('5'), //18
    md: wp('5.1'), //20,
    lg: wp('5.8'), //22
    xl: wp('6.2'), //25,,
    '2xl': wp('6.4'), //25,
    '3xl':  wp('7'), //27,
    '4xl':  wp('7.6'), //30,
    '5xl': wp('8.7'), //34,
    '6xl': wp('9.6'), //37.5
    '7xl': wp('10.8'), //42
  },
  fontSizes: {
    '2xs': wp('2.7'), // 10
    xs: wp('3.2'), //12
    sm: wp('3.6'), //14
    md: wp('4.1'), //16
    lg: wp('4.6'), //18
    xl: wp('5.1'), //20
    '2xl': wp('6.4'), //25
    '3xl': wp('7'), //27
    '4xl': wp('8.7'), //34
    '5xl': wp('8.7'), //32
    '6xl': wp('8.7'), //40
  },
  fonts: {
    circularStdBlack: 'CircularStd-Black',
    circularStdBlackItalic: 'CircularStd-BlackItalic',
    circularStdBold: 'CircularStd-Bold',
    circularStdBoldItalic: 'CircularStd-BoldItalic',
    circularStdBook: 'CircularStd-Book',
    circularStdBookItalic: 'CircularStd-BookItalic',
    circularStdMedium: 'CircularStd-Medium',
    circularStdMediumItalic: 'CircularStd-MediumItalic',
  },
};

export default typography;
