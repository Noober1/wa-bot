import type { Client, Message } from "whatsapp-web.js";
import MainClass from "./mainClass";

class Logout extends MainClass {
  constructor(message: Message, client: Client, commandArgs: any) {
    super(message, client, commandArgs);

    if (!commandArgs?.pass) {
      this.message.reply(
        "Kata sandi dibutuhkan, silahkan untuk menambahkan parameter 'pass' untuk menambahkan kata sandi"
      );
    } else if (process.env.LOGOUT_PASS != commandArgs.pass) {
      this.message.reply("Kata sandi salah");
    } else {
      client.logout().then(() => {
        console.log("Logout successful");
      });
    }
  }
}

export default Logout;
