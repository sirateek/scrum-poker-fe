import { Command } from "@/models/command";
import router from "@/router";
import {
  LocalStorageKey,
  localStorageProvider,
} from "@/utils/LocalStorageProvider";
import { loggingProvider } from "@/utils/LoggingProvider";
import { socketCommand } from "./SocketCommand";

class SocketCommandHandler {
  handle(command: Command<any>) {
    console.log(command.command);
    switch (command.command) {
      case "IDENTIFY_U_R_SELF":
        this.handleIdentifyYourself();
        break;
      default:
        console.log("Here");
    }
  }

  handleIdentifyYourself() {
    let name: string;

    try {
      name = localStorageProvider.getItem(LocalStorageKey.Name);
    } catch {
      loggingProvider.log("Push to register view, No default name.");
      router.replace({
        name: "RegisterView",
      });
      return;
    }

    socketCommand.registerPlayer(name);
  }
}

const socketCommandHandler = new SocketCommandHandler();

export { socketCommandHandler };
