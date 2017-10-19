import React from 'react';

var rStyle = {
  fontSize: '20px',
  position: 'absolute'
}

const Header = (props) => (
  <div className="header row">
    <h1 className="">MonitorMe<span style={rStyle}>®</span><small style={{paddingLeft: '20px'}} className="hidden-xs hidden-sm">Let's keep the lounge clean</small></h1>
  </div>
);

export default Header;
