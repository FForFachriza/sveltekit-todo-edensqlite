import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { PUBLIC_API_PATH } from "$env/static/public";

const app = new Elysia({ prefix: PUBLIC_API_PATH })
  .use(swagger())
  .get("/hi", () => "Hi Elysia");

export type App = typeof app;

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
