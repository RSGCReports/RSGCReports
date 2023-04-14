class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes('help')) {
      this.actionProvider.help();
    } else if (lowercase.includes('admin') || lowercase.includes('review')) {
      this.actionProvider.admin();
    } else if (
      lowercase.includes('steps') ||
      lowercase.includes('step') ||
      lowercase.includes('next') ||
      lowercase.includes('guide')
    ) {
      this.actionProvider.steps();
    } else if (
      lowercase.includes('hello') ||
      lowercase.includes('greetings') ||
      lowercase.includes('hi') ||
      lowercase.includes('hey')
    ) {
      this.actionProvider.greet();
    } else {
      this.actionProvider.catchAll();
    }
  }
}

export default MessageParser;
