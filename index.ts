import dotenv from "dotenv";
dotenv.config();

import qrcode from "qrcode-terminal";
import { Client, LocalAuth, Buttons } from "whatsapp-web.js";
import commands from "./commands";
import { getCommand, getCommandArgs } from "./utils/commandString";

import type { Message } from "whatsapp-web.js";

const commandsKeys = Object.keys(commands);

if (commandsKeys.length < 1) {
  throw new Error("Command script invalid");
}

// init whatsapp-web.js
const client = new Client({
  authStrategy: new LocalAuth(),
});

// generate qr code for login
client.on("qr", (qr) => {
  console.log("Scan this QR with your phone");
  qrcode.generate(qr, { small: true });
});

// do something when app ready
client.on("ready", () => {
  console.log("Client is ready!");
});

// main message handler
const messageHandler = (message: Message) => {
  const command = getCommand(message.body, "!");
  const args = getCommandArgs(message.body);

  if (!command) return;

  let CommandToExecute = commands[command];
  if (typeof CommandToExecute == "undefined") {
    let commandList = commandsKeys.reduce(
      (prev, current) => prev + `!${current}\n`,
      ""
    );

    return message.reply(
      "*Perintah tidak ditemukan*\nBerikut adalah beberapa perintah yang dapat digunakan:\n\n" +
        commandList
    );
  }

  if (args && !args.isValid) {
    return message.reply("*Argument invalid*");
  }

  if (typeof CommandToExecute !== "function") {
    return message.reply("Command is not a function");
  }

  try {
    new CommandToExecute(message, client, args?.data);
  } catch (error) {
    if (error instanceof Error) {
      message.reply(`Fatal Error: ${error?.message}`);
    }
  }
};

// event listener on message
client.on("message", messageHandler);

// init app
client.initialize();
