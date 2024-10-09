import React from 'react';
import './Key.css';

const Key = ({ key_name, width, height }) => {
  const style = {
    width: `${width * 40}px`, // Base unit: 40px
    height: `${height * 40}px`,
  };

  return (
    <div className="key" style={style}>
      {key_name}
    </div>
  );
};

export default Key;
