import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from '@/features/auth/server/route';
export const runtime = "edge";

const app = new Hono().basePath("/api");
app.get("/",(c) => {
    return c.json({msg: 'API IS RUNNING🚀'});
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routers = app.route("/auth",auth);
export const GET = handle(app);
export const POST = handle(app);
export type AppType = typeof routers;