import { currentUser } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const user = await currentUser();

  if (!user) return null;

  // publicMetadata may be undefined
  // roles should be an array like ["admin"]
  const roles = (user.publicMetadata?.roles as string[]) || [];

  if (!Array.isArray(roles)) return null;
  if (!roles.includes("admin")) return null;

  return user;
}
