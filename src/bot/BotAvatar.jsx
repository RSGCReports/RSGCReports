import React from 'react';
import './BotAvatar.css';
import roboto from '../assets/robot-svgrepo-com.svg';
const BotAvatar = () => {
  return (
    <div className="botAvatar">
      <img src={roboto} />
    </div>
  );
};

export default BotAvatar;
