import { type Static } from "elysia";
import { auth } from "@/server/auth";
import type { AuthModel } from "../auth.model";

type SignUpBody = Static<typeof AuthModel.signUpBody>;

export async function signUp(body: SignUpBody) {
  const { email, name, password } = body;

  return await auth.api.signUpEmail({
    body: {
      email: email,
      password: password,
      name: name,
    },
    returnHeaders: true,
  });
}
