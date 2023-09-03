import mitt, { Emitter } from "mitt";

export enum EventKey {
  ServerConnected,
  ServerDisconnected,
}

class EventBusFactory {
  private _eventBus: Emitter<any>;

  constructor() {
    this._eventBus = mitt();
  }

  public get eventBus(): Emitter<any> {
    return this._eventBus;
  }
}

const eventBusFactory = new EventBusFactory();

export { eventBusFactory };
