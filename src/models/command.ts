export interface Command<T> {
  command: string;
  attributes: T;
}

export interface RegisterPlayer {
  name: string;
}
