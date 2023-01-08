import { Message, Client } from "whatsapp-web.js";
import MainClass from "./mainClass";

class sendTextMessage extends MainClass {
  constructor(message: Message, client: Client, commandArgs: any) {
    super(message, client, commandArgs);
    const validateParameter = this.validateParameter({
      args: commandArgs,
      min: 1,
      max: 2,
    });

    if (!validateParameter) {
      message.reply("Parameter tidak valid");
    } else if (!this.checkArgs()) {
      message.reply(
        "Parameter tidak lengkap, pastikan untuk mengirimkan parameter 'pesan' dan 'tujuan'"
      );
    } else {
      this.sendMessage(commandArgs.tujuan, commandArgs.pesan);
    }
  }

  checkArgs() {
    return (
      typeof this.commandArgs?.pesan !== "undefined" ||
      typeof this.commandArgs?.tujuan !== "undefined"
    );
  }

  async sendMessage(number: string, message: string) {
    try {
      let destinationNumber = number.replace("-", "");
      if (number.startsWith("+62")) {
        destinationNumber = destinationNumber.replace("+", "") + "@c.us";
      } else if (number.startsWith("08")) {
        destinationNumber = number.replace("08", "628") + "@c.us";
      } else {
        throw new Error(`Nomor tujuan ${number} tidak valid`);
      }

      const isRegisteredUser = await this.client.isRegisteredUser(
        destinationNumber
      );

      if (!isRegisteredUser) {
        throw new Error("Nomor tujuan tidak terdafter whatsapp");
      }

      this.client.sendMessage(destinationNumber, message).then(() => {
        this.message.reply("Pesan berhasil dikirim");
      });
    } catch (error) {
      if (error instanceof Error) {
        this.message.reply(error.message);
      } else {
        console.error(error);
        this.message.reply("unknown error");
      }
    }
  }
}

export default sendTextMessage;
