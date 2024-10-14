import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schema";
const app = new Hono()
  .post("/login", zValidator("json", loginSchema), (c) => {
    const { email, password } = c.req.valid("json");
    return c.json({ email, password });
  })
  .post("/register", zValidator("json", registerSchema), (c) => {
    const { email, password, name } = c.req.valid("json");
    return c.json({ email, password, name });
  });
export default app;
