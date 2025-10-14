import { type Static } from "elysia";
import { auth } from "@/server/auth";
import type { AuthModel } from "../auth.model";

type SignInBody = Static<typeof AuthModel.signInBody>;

export async function signIn(body: SignInBody) {
  const { email, password } = body;

  return await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
    },
    returnHeaders: true,
  });
}
