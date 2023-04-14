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
    const message = this.createChatBotMessage('E-mail our team lead: sfrunza@myseneca.ca');
    this.addChatbotMessageToState(message);
  };

  handleFindACenter = () => {
    const message = this.createChatBotMessage('Check out this useful tool!', {
      widget: 'findACenter',
    });

    this.addChatbotMessageToState(message);
  };

  handleBigDamage = () => {
    const message = this.createChatBotMessage(
      'For damages exceeding $2000 you must by law contact the police. Serious crashes of this magnitude are out of our scope and we implore you Call 911 now!'
    );
    this.addChatbotMessageToState(message);
  };

  catchAll = () => {
    const message = this.createChatBotMessage(
      'Sorry, I am not yet equipped to handle this query. Could you please re-word it or perhaps contact our team lead @ sfrunza@myseneca.ca'
    );
    this.addChatbotMessageToState(message);
  };

  help = () => {
    const message = this.createChatBotMessage(
      'Begin by navigating to the profile page and entering personal, insurance, and vehicle information.'
    );
    this.addChatbotMessageToState(message);
  };

  admin = () => {
    const message = this.createChatBotMessage(
      'Once your report is submitted an admin will review it and either accept or reject your report. Should your report be rejected, you may then take the advice left in the comments text area and create a new one to address any existing issues.'
    );
    this.addChatbotMessageToState(message);
  };

  prettyGood = () => {
    const message = this.createChatBotMessage('Pretty well, and yourself?');
    this.addChatbotMessageToState(message);
  };

  steps = () => {
    const message = this.createChatBotMessage('Follow these steps in order: ', {
      widget: 'steps',
    });
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
