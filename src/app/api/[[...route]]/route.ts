import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";
import members from "@/features/member/server/route";
import projects from "@/features/projects/server/route";
import tasks from "@/features/tasks/server/route";
export const runtime = "edge";

const app = new Hono().basePath("/api");
app.get("/", (c) => {
  return c.json({ msg: "API IS RUNNING🚀" });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routers = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks);
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routers;
