import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkSpacesSchema } from "@/features/workspaces/schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID
    );
    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", createWorkSpacesSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");
      const { name, image, filename } = c.req.valid("form");
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
      const workspaces = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadImageUrl,
        }
      );
      return c.json({ data: workspaces });
    }
  );

export default app;
