import { t } from "elysia";
import type { TObject } from "@sinclair/typebox";

export const createResponse = <T extends TObject>(data: T) =>
  t.Object({
    status: t.Number(),
    data: t.Nullable(data),
    message: t.String(),
  });
