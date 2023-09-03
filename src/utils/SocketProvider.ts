import { ConfigProvider } from "./ConfigProvider";
import { EventKey, eventBusFactory } from "./EventBusFactory";
import { loggingProvider } from "./LoggingProvider";

class SocketProvider {
  private _socket!: WebSocket;
  private _disconnectReason!: string;

  constructor() {
    this.connect();
  }

  connect() {
    // Clear the exising state.
    this._disconnectReason = "";

    this._socket = new WebSocket(
      ConfigProvider.instance.config.VITE_POKER_WS_HOST + "/ws"
    );

    this._socket.onopen = (_) => {
      loggingProvider.log("Connected to the server");
      eventBusFactory.eventBus.emit(EventKey.ServerConnected);
    };

    this._socket.onmessage = (ev) => {};

    this._socket.onclose = (ev) => {
      this._disconnectReason = ev.reason;
      console.log("Server Disconnected");
      eventBusFactory.eventBus.emit(EventKey.ServerDisconnected);
    };
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
