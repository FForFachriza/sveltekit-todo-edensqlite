import { Elysia } from "elysia";
import { Auth } from "./auth.service";
import { AuthModel } from "./auth.model";

export const authController = new Elysia({ prefix: "/auth" }).post(
  "/sign-up",
  async ({ body }) => {
    try {
      const response = await Auth.signUp(body);
      return {
        status: 200,
        data: {
          token: response.token!,
          email: response.user.email,
          username: response.user.name,
        },
        message: "Sign Up successful",
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
    body: AuthModel.signUpBody,
    response: AuthModel.signUpResponse,
  },
);
