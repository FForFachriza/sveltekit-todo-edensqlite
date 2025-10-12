import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PUBLIC_API_PATH } from "$env/static/public";
import { auth } from "@/server/auth";
import { authController } from "@/server/auth/controller";

const app = new Elysia({ prefix: PUBLIC_API_PATH })
  .use(swagger())
  .use(authController)
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  })
  .get("/user", ({ user }) => user, {
    auth: true, // TODO : DELETE THIS SHIT LATER
  })
  .get("/hi", () => "Hi Elysia");

export type App = typeof app;

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
