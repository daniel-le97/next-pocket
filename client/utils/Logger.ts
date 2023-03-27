/* eslint-disable @typescript-eslint/no-explicit-any */




type LogLevel = "log" | "error" | "warn" | "assert" | "trace";

type LogFunction = {
  (message?: any, ...optionalParams: any[]): void;
};

type Logger = {
  [key in LogLevel]: LogFunction;
};

function log(type: LogLevel, content: any[]): void {
  const dev = true;
  if (dev) {
    console[type](
      `[${type}] :: ${new Date().toLocaleTimeString()} :: `,
      ...(content as Parameters<Console[LogLevel]>)
    );
  } else {
    switch (type) {
      case "log":
      case "assert":
        return;
    }
    // TODO SEND LOGS TO EXTERNAL SERVICE
    // eslint-disable-next-line no-console
    console[type](
      `[${type}] :: ${new Date().toLocaleTimeString()} :: `,
      ...(content as Parameters<Console[LogLevel]>)
    );
  }
}

export const logger: Logger = {
  log(...args) {
    log("log", args);
  },
  error(...args) {
    log("error", args);
  },
  warn(...args) {
    log("warn", args);
  },
  assert(...args) {
    log("assert", args);
  },
  trace(...args) {
    log("trace", args);
  },
};
