import MainClass from "./mainClass";

class Ping extends MainClass {
  constructor(message, client, commandArgs) {
    super(message, client, commandArgs);
    this.sendPong("PONG");
  }

  sendPong(text: string) {
    this.message.reply(text);
  }
}

export default Ping;
