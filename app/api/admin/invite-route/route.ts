import { serverClient } from "@/app/lib/sanity.server";

// Suppose you have a user object
const user = { id: "user_id", emailAddresses: ["test@example.com"] };

// Use the email from the user
const email = user.emailAddresses[0]; // or user.email if it exists

const sanityRes = await serverClient.create({
  _type: "author",
  name: email.split("@")[0], // default name
  slug: { current: email.split("@")[0] },
  clerkId: user.id,
  socialLinks: {},
});
