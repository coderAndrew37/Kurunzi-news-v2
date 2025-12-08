import { serverClient } from "@/app/lib/sanity.server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  const evt = wh.verify(body, {
    "svix-id": headersList.get("svix-id")!,
    "svix-timestamp": headersList.get("svix-timestamp")!,
    "svix-signature": headersList.get("svix-signature")!,
  });

  const { data } = evt;

  if (evt.type === "user.created" || evt.type === "user.updated") {
    const clerkId = data.id;
    const email = data.email_addresses?.[0]?.email_address;
    const name = data.first_name || email?.split("@")[0];

    await serverClient.createOrReplace({
      _type: "author",
      _id: `author-${clerkId}`,
      name,
      clerkId,
      slug: { current: name.toLowerCase().replace(/\s+/g, "-") },
    });
  }

  return new Response("OK", { status: 200 });
}
