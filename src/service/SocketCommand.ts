import { socketProvider } from "@/utils/SocketProvider";

export enum CommandPrefix {
  Register = "Register",
}

class SocketCommand {
  registerPlayer(name: string) {
    const baseCommand = "RegisterPlayer";
    socketProvider.sendMessage(`${baseCommand},${name}`);
  }
}

const sockerCommand = new SocketCommand();
export { sockerCommand };
