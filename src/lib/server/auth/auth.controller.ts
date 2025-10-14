import { Elysia } from "elysia";
import { Auth } from "./auth.service";
import { AuthModel } from "./auth.model";

export const authController = new Elysia({ prefix: "/auth" })
  .post(
    "/sign-up",
    async ({ body, set }) => {
      try {
        const response = await Auth.signUp(body);
        const { name, email } = response.response.user;
        const headers = response.headers;

        const setCookie = headers.get("set-cookie");

        if (setCookie) set.headers["set-cookie"] = setCookie;

        return {
          status: 200,
          data: {
            email: email,
            username: name,
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
  )
  .post(
    "/sign-in",
    async ({ body, set }) => {
      try {
        const response = await Auth.signIn(body);

        const { name, email } = response.response.user;

        const headers = response.headers;

        const setCookie = headers.get("set-cookie");

        if (setCookie) set.headers["set-cookie"] = setCookie;

        return {
          status: 200,
          data: {
            email: email,
            username: name,
          },
          message: "Sign In successful",
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
