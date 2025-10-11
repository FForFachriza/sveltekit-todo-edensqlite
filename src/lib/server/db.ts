import { DATABASE_URL } from "$env/static/private";
import { PrismaClient } from "../../generated/prisma/client";

const db = new PrismaClient({
  datasourceUrl: DATABASE_URL,
});

export default db;
