import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Tooltip } from 'antd';

export const InputNumeric = (props) => {
  const [numericValue, setNumericValue] = useState('');

  const onChange = (e) => {
    const { value } = e.target;
    if (!isNaN(value) || value === '') {
      setNumericValue(value);
    }
  };

  return (
    <Tooltip trigger={['focus']} title='Input a number' placement='topRight' overlayClassName='numeric-input'>
      <Input {...props} value={numericValue} onChange={onChange} allowClear />
    </Tooltip>
  );
};
