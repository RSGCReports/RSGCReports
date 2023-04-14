class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest // eslint-disable-line no-unused-vars
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  greet = () => {
    const message = this.createChatBotMessage('Hello fellow Ontarian');
    this.addChatbotMessageToState(message);
  };

  handleContactUs = () => {
    const message = this.createChatBotMessage('E-mail our team lead here: sfrunza@myseneca.ca');
    this.addChatbotMessageToState(message);
  };

  addChatbotMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
