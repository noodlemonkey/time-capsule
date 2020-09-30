import React from 'react';

const MessageArea = (props) => {
  return (
    <textarea
      name="message"
      id="message"
      value={props.message}
      onChange={props.handleMessage}
    ></textarea>
  );
};

export default MessageArea;
