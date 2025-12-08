import { serverClient } from "@/app/lib/sanity.server";

const sanityRes = await serverClient.create({
  _type: "author",
  name: email.split("@")[0], // default name
  slug: { current: email.split("@")[0] },
  clerkId: user.id,
  socialLinks: {},
});
