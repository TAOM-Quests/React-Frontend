import { setupWorker } from "msw/browser";
import { apiHandlers } from "./api/apiHandlers";

export const worker = setupWorker(...apiHandlers)
