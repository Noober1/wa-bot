import type { Message, Client } from "whatsapp-web.js";
import _ from "lodash";

import {
  getCommand,
  getCommandArgs,
  validateArgsLength,
} from "../utils/commandString";

type TValidateParams = {
  args: {
    [key: string]: any;
  };
  min?: number;
  max?: number;
};

class MainClass {
  message: Message;
  client: Client;
  commandArgs: any;
  constructor(message: Message, client: Client, commandArgs: any) {
    this.message = message;
    this.client = client;
    this.commandArgs = commandArgs;
  }

  validateParameter(params: TValidateParams) {
    if (typeof params.args == "undefined") return false;

    let min = params?.min || 1;
    let max = params?.max || 1;
    if (min > max) return false;
    let isArgsLengthValid = validateArgsLength(params.args, min, max);
    return isArgsLengthValid;
  }
}

export default MainClass;
