const getCommand = (string, commandPrefix) => {
  try {
    if (!commandPrefix || commandPrefix.length < 1) {
      throw new Error("Command prefix invalid");
    }

    let prefixFromString = string.slice(0, commandPrefix.length);
    if (commandPrefix !== prefixFromString) {
      throw new Error("Command prefix invalid");
    }

    return string.split(" ")[0].slice(commandPrefix.length);
  } catch (error) {
    return false;
  }
};

type TReturnValueGetCommandArgs = {
  isValid: boolean;
  data: Object;
  message?: string;
};

const getCommandArgs = (string) => {
  let returnValue: TReturnValueGetCommandArgs = { isValid: true, data: {} };
  try {
    let regexp = /([a-z]+="[^"]+"|"[^"]+"|[^\s"]+)/gims;
    let args = string.trim().split(" ");
    args.shift();
    args = args.join(" ");
    args = args.match(regexp);
    let dataToReturn = {};

    if (args) {
      args.forEach((item) => {
        let param = item.split("=");
        dataToReturn[param[0]] =
          param.length > 1 ? param[1].replace(/^"(.*)"$/, "$1") : null;
      });

      returnValue.data = dataToReturn;
    }

    return returnValue;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      returnValue.isValid = false;
      returnValue.message = error.message || "Unknown";
      return returnValue;
    }
  }
};

const validateArgsLength = (args: any, min = 0, max = 1) => {
  try {
    if (typeof args !== "object") {
      throw new Error("Arguments invalid");
    }

    let argsKeys = Object.keys(args);
    if (argsKeys.length < min || argsKeys.length > max) {
      throw new Error("Arguments length invalid");
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return false;
  }
};

export { getCommand, getCommandArgs, validateArgsLength };
