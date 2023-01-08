import { Message, Client } from "whatsapp-web.js";
import MainClass from "./mainClass";

class MyNumber extends MainClass {
  constructor(message: Message, client: Client, commandArgs: any) {
    super(message, client, commandArgs);
    message.reply(this.formatNumber(message.from));
  }

  formatNumber(number: string) {
    return "+" + number.replace("@c.us", "");
  }
}

export default MyNumber;
