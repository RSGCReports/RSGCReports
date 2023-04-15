import React from 'react';

import './FindACenter.css';
const FindACenter = () => {
  return (
    <div className="container-sm" style={{ alignContent: 'center' }}>
      <a href="https://accsupport.com/locations/">
        <button className="findACenterButton">
          <span className="FaSearchLocation"></span>
          Click Here!
        </button>
      </a>
    </div>
  );
};

export default FindACenter;
