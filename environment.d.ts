declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OUTPUT_DIR: string;
    }
  }
}

export {};
