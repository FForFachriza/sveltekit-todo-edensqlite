import { type Static } from "elysia";
import { AuthModel } from "./model";
import { auth } from "../auth";

type SignInBody = Static<typeof AuthModel.signInBody>;

export const Auth = {
  async signIn(body: SignInBody) {
    const { email, name, password } = body;
    return await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: name,
      },
    });
  },
};
