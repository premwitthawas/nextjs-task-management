import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  createWorkSpacesSchema,
  updateWorkSpacesSchema,
} from "@/features/workspaces/schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/member/types";
import { generateInviteCode } from "@/lib/utils";
import { getMember } from "@/features/member/utils";
import { z } from "zod";
import { Workspace } from "@/features/workspaces/types";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return c.json({
        data: {
          documents: [],
          total: 0,
        },
      });
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
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
          inviteCode: generateInviteCode(6),
        }
      );
      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspaces.$id,
        role: MemberRole.ADMIN,
      });
      return c.json({ data: workspaces });
    }
  )
  .patch(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form", updateWorkSpacesSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");
      const workspaceId = c.req.param("workspaceId");
      const { filename, name, image } = c.req.valid("form");
      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({ error: "Unauthorized" }, 401);
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
      } else {
        uploadImageUrl = image;
      }
      const workspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId,
        {
          name,
          imageUrl: uploadImageUrl,
        }
      );
      return c.json({ data: workspace });
    }
  )
  .delete("/:workspaceId", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");
    const workspaceId = c.req.param("workspaceId");
    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: workspaceId,
    });

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    //TODO: Delete member

    await databases.deleteDocument(DATABASE_ID, WORKSPACES_ID, workspaceId);

    return c.json({ data: { $id: workspaceId } });
  })
  .post("/:workspaceId/reset-invite-code", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const user = c.get("user");

    const workspaceId = c.req.param("workspaceId");

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const workspace = await databases.updateDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId,
      {
        inviteCode: generateInviteCode(6),
      }
    );

    return c.json({ data: workspace });
  })
  .post(
    "/:workspaceId/join",
    sessionMiddleware,
    zValidator("json", z.object({ code: z.string() })),
    async (c) => {
      const workspaceId = c.req.param("workspaceId");
      const { code } = c.req.valid("json");
      const databases = c.get("databases");
      const user = c.get("user");
      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });
      if (member) {
        return c.json({ error: "Already a member" }, 400);
      }
      const wokspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId
      );
      if (wokspace.inviteCode !== code) {
        return c.json({ error: "Invalid invite code" }, 400);
      }
      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        workspaceId,
        userId: user.$id,
        role: MemberRole.MEMBER,
      });
      return c.json({ data: wokspace });
    }
  );

export default app;
