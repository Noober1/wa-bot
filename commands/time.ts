import { Message, Client } from "whatsapp-web.js";
import MainClass from "./mainClass";

class Time extends MainClass {
  constructor(message: Message, client: Client, commandArgs: any) {
    super(message, client, commandArgs);
    message.reply(new Date().toString());
  }
}

export default Time;
