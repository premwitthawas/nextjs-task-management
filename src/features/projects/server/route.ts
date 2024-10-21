import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/config";
import { getMember } from "@/features/member/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { createProjectSchema } from "../schema";
const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { workspaceId } = c.req.valid("query");
      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });
      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      if (!workspaceId) {
        return c.json({ error: "WorkspaceId is Missing" }, 400);
      }
      const projests = await databases.listDocuments(DATABASE_ID, PROJECTS_ID, [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ]);
      return c.json({ data: projests });
    }
  )
  .post(
    "/",
    zValidator("form", createProjectSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");
      const { name, image, filename, workspaceId } = c.req.valid("form");
      const member = await getMember({
        workspaceId,
        databases,
        userId: user.$id,
      });
      if (!member) {
        return c.json({ error: "Unauthroized" }, 401);
      }
      let uploadImageUrl: string | undefined;
      if (image instanceof Blob) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const newFile = new File([buffer], filename as string, {
          type: image.type,
        });
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          newFile
        );
        const arrayBuffer = await storage.getFilePreview(
          IMAGES_BUCKET_ID,
          file.$id
        );
        uploadImageUrl = `data:${image.type};base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }
      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          workspaceId: workspaceId,
          imageUrl: uploadImageUrl,
        }
      );
      return c.json({ data: project });
    }
  );

export default app;
