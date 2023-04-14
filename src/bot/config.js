import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import Recommendations from './widgets/Recommendations';
import FindACenter from './widgets/FindACenter';
import Steps from './widgets/Steps';

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
    {
      widgetName: 'findACenter',
      widgetFunc: () => <FindACenter />,
    },
    {
      widgetName: 'steps',
      widgetFunc: () => <Steps />,
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
