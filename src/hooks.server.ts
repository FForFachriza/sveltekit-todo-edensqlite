import { redirect, type Handle } from "@sveltejs/kit";
import { auth } from "@/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
  const {
    request: { headers },
    url: { pathname },
  } = event;
  const session = await auth.api.getSession({
    headers: headers,
  });

  const publicRoutes: string[] = [
    "/sign-in",
    "/sign-up",
    "/api/auth/sign-in",
    "/api/auth/sign-up",
  ];

  const isPublicRoute = publicRoutes.some((route) => pathname === route);
  const isLoggedIn = session !== null;

  if (!isPublicRoute && !isLoggedIn) {
    redirect(308, "/sign-in");
  }

  return resolve(event);
};
