import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getMember } from "../utils";
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Query } from "node-appwrite";
import { Member, MemberRole } from "@/features/member/types";

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
      const { users } = await createAdminClient();
      const databases = c.get("databases");
      const user = c.get("user");
      const { workspaceId } = c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthroize" }, 401);
      }
      const members = await databases.listDocuments<Member>(DATABASE_ID, MEMBERS_ID, [
        Query.equal("workspaceId", workspaceId),
      ]);
      const populatedMember = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);
          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        })
      );
      return c.json({
        data: {
          ...members,
          documents: populatedMember,
        },
      });
    }
  )
  .delete("/:memberId", sessionMiddleware, async (c) => {
    const memberId = c.req.param("memberId");
    const user = c.get("user");
    const databases = c.get("databases");
    const memberToDelete = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      memberId
    );
    const allMemberInworksapce = await databases.listDocuments(
      DATABASE_ID,
      MEMBERS_ID,
      [Query.equal("workspaceId", memberToDelete.$id)]
    );
    const member = await getMember({
      databases,
      workspaceId: memberToDelete.workspaceId,
      userId: user.$id,
    });
    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    if (member.$id !== memberToDelete.$id && member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    if (allMemberInworksapce.total === 1) {
      return c.json({ error: "Can't Not Delete Member remain only 1" }, 400);
    }
    await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId);
    return c.json({
      data: {
        $id: memberId,
      },
    });
  })
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        role: z.nativeEnum(MemberRole),
      })
    ),
    async (c) => {
      const memberId = c.req.param("memberId");
      const { role } = c.req.valid("json");
      const user = c.get("user");
      const databases = c.get("databases");
      const memberToUpdate = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId
      );
      const allMemberInworksapce = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToUpdate.$id)]
      );
      const member = await getMember({
        databases,
        workspaceId: memberToUpdate.workspaceId,
        userId: user.$id,
      });
      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      if (
        member.$id !== memberToUpdate.$id &&
        member.role !== MemberRole.ADMIN
      ) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      if (allMemberInworksapce.total === 1) {
        return c.json({ error: "Can't drowgrade the only member" }, 400);
      }
      await databases.updateDocument(DATABASE_ID, MEMBERS_ID, memberId, {
        role: role,
      });
      return c.json({
        data: {
          $id: memberId,
        },
      });
    }
  );

export default app;
