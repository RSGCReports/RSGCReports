import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import Recommendations from './widgets/Recommendations';

const config = {
  initialMessages: [
    createChatBotMessage(`Hi, here are some recommendations: `, {
      widget: 'recommendations',
    }),
  ],
  widgets: [
    {
      widgetName: 'recommendations',
      widgetFunc: (props) => <Recommendations {...props} />,
    },
  ],
  botName: 'RSGC Bot',
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;
