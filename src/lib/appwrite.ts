import "server-only";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env["NEXT_PUBLIC_APPWRITE_ENDPOINT"] as string)
    .setProject(process.env["NEXT_PUBLIC_APPWRITE_PROJECT"] as string)
    .setKey(process.env["NEXT_APPWRITE_KEY"] as string);
  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    }
  };
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env["NEXT_PUBLIC_APPWRITE_ENDPOINT"] as string)
    .setProject(process.env["NEXT_PUBLIC_APPWRITE_PROJECT"] as string);
  const session = await cookies().get(AUTH_COOKIE);
  if (!session || !session.value) {
    throw new Error("Unauthorize");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client)
    },
    get databases() {
      return new Databases(client);
    }
  }
}
