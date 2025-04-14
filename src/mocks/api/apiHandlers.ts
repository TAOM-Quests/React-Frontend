import { HttpHandler } from "msw";
import { usersHandlers } from "./userModule/users";

export const apiHandlers: HttpHandler[] = [
  ...usersHandlers
]