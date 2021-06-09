import React from 'react';

const Logo = props => {
  return (
    <img
      style={{ 'borderRadius': '70%' }}
      alt="Logo"
      src="/static/logo.svg"
      width="45px"
      // height="10px"
      {...props}
    />
  );
};

export default Logo;
