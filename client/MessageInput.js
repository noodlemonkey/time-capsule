import React from 'react';

const MessageInput = (props) => {
  return (
    <textarea
      name="message"
      id="message"
      value={props.message}
      onChange={props.handleMessage}
    ></textarea>
  );
};

export default MessageInput;
