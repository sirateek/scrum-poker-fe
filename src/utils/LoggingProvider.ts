const LOGGING_PREFIX = "[POKER]";

class LoggingProvider {
  log(...message: any) {
    console.log(`${LOGGING_PREFIX} ${message}`);
  }
}

const loggingProvider = new LoggingProvider();

export { loggingProvider };
