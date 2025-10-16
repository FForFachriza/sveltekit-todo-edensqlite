import { t } from "elysia";
import { createResponse } from "@/server/create-response";

export const signUpBody = t.Object({
  email: t.String(),
  name: t.String(),
  password: t.String(),
});

export const signUpResponse = createResponse(
  t.Object({
    username: t.String(),
    email: t.String(),
  }),
);
