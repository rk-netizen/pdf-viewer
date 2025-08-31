import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.ts";

export const worker = setupWorker(...handlers);

// used MSW (Mock Service worker) to mock API requests / backend
// this file creates a service worker instance
// kind of initiating the mock backend server / API server
