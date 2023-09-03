import { ConfigProvider } from "./ConfigProvider";
import { EventKey, eventBusFactory } from "./EventBusFactory";
import { loggingProvider } from "./LoggingProvider";
import { socketCommandHandler } from "@/service/SocketCommandHandler";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

class SocketProvider {
  private _socket!: WebSocket;
  private _disconnectReason!: string;
  private _isConnected = false;

  constructor() {
    this.connect();
  }

  connect() {
    // Clear the exising state.
    this._disconnectReason = "";
    this._isConnected = false;
    if (this._socket) {
      this._socket.close(1000, "close for reconnection");
    }

    this._socket = new WebSocket(
      ConfigProvider.instance.config.VITE_POKER_WS_HOST + "/ws"
    );

    this._socket.onopen = () => {
      loggingProvider.log("Connected to the server");
      this._isConnected = true;
      eventBusFactory.eventBus.emit(EventKey.ServerConnected);
    };

    this._socket.onmessage = (ev: MessageEvent<string>) => {
      socketCommandHandler.handle(JSON.parse(ev.data));
    };

    this._socket.onclose = (ev) => {
      this._disconnectReason = ev.reason;
      this._isConnected = false;
      console.log("Server Disconnected");
      eventBusFactory.eventBus.emit(EventKey.ServerDisconnected);
    };

    return new Promise<void>(async (resolve, reject) => {
      for (let i = 0; i < 3; i++) {
        if (this._isConnected) {
          resolve();
        }
        await sleep(1000);
      }
      reject();
    });
  }

  getConnectionStatus() {
    return this._socket.readyState;
  }

  getDisconnectReason(): string {
    return this._disconnectReason;
  }

  sendMessage(message: string) {
    this._socket.send(message);
  }
}

const socketProvider = new SocketProvider();

export { socketProvider };
