declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      OUTPUT_DIR: string;
      OUTPUT_FILE: string;
    }
  }
}

export {};
