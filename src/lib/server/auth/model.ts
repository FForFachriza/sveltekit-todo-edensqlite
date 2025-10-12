import { t } from "elysia";
import { createResponse } from "../create-response";

export const signInBody = t.Object({
  email: t.String(),
  name: t.String(),
  password: t.String(),
});

export const signInResponse = createResponse(
  t.Object({
    username: t.String(),
    email: t.String(),
    token: t.String(),
  }),
);

export const AuthModel = {
  signInBody,
  signInResponse,
  // signInInvalid,
  // loginResponse,
};
