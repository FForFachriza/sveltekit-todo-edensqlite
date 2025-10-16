import { t } from "elysia";
import { createResponse } from "@/server/create-response";

export const signInBody = t.Object({
  email: t.String(),
  password: t.String(),
});

export const signInResponse = createResponse(
  t.Object({
    username: t.String(),
    email: t.String(),
  }),
);
