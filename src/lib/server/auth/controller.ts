import { Elysia } from "elysia";
import { Auth } from "./service";
import { AuthModel } from "./model";

export const authController = new Elysia({ prefix: "/auth" }).post(
  "/sign-in",
  async ({ body }) => {
    try {
      const response = await Auth.signIn(body);
      return {
        status: 200,
        data: {
          token: response.token!,
          email: response.user.email,
          username: response.user.name,
        },
        message: "Sign-in successful",
      };
    } catch (e) {
      return {
        status: 400,
        data: null,
        message: (e as Error).message,
      };
    }
  },
  {
    body: AuthModel.signInBody,
    response: AuthModel.signInResponse,
  },
);
