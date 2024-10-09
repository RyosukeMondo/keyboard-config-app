import React from 'react';
import './Key.css';

const Key = ({ letter, width, height }) => {
  const style = {
    width: `${width * 40}px`, // Base unit: 40px
    height: `${height * 40}px`,
  };

  return (
    <div className="key" style={style}>
      {letter}
    </div>
  );
};

export default Key;
