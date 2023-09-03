import { socketProvider } from "@/utils/SocketProvider";
import { Command, RegisterPlayer } from "@/models/command";

export enum CommandPrefix {
  Register = "REGISTER",
}

class SocketCommand {
  registerPlayer(name: string) {
    const command: Command<RegisterPlayer> = {
      command: CommandPrefix.Register,
      attributes: {
        name: name,
      },
    };

    socketProvider.sendMessage(JSON.stringify(command));
  }
}

const socketCommand = new SocketCommand();
export { socketCommand };
