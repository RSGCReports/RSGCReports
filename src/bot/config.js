import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
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
