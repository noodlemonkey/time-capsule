import React from 'react';

const AddressInput = (props) => {
  return (
    <div>
      <label>E-mail Address:</label>
      <input type="email" onChange={props.handleAddress}></input>
    </div>
  );
};

export default AddressInput;
