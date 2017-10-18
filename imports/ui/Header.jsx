import React from 'react';

var rStyle = {
  fontSize: '20px',
  position: 'absolute'
}

const Header = (props) => (
  <div className="header row">
    <h1 className="col-md-3">MonitorMe<span style={rStyle}>®</span></h1>
  </div>
);

export default Header;
