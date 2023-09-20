import React, {useEffect, useState} from 'react';
import {Text} from '../../../../../components';
import theme from '../../../../../util/theme';

const ChatTyping = props => {
  const {name, typingMsg, style, ...otherProps} = props;
  const [isTyping, setIsTyping] = useState();
  let typingTimeout = null;

  useEffect(() => {
    setIsTyping(true);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 800);
    return () => {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    };
  }, [typingMsg]);

  return typingMsg && isTyping ? (
    <Text
      type={'caption12'}
      fontFamily={theme.typography.fonts.circularStdMediumItalic}
      style={style}
      {...otherProps}>
      {typingMsg?.name ? `${typingMsg?.name} is typing...` : 'typing ..'}
    </Text>
  ) : null;
};

export default ChatTyping;
