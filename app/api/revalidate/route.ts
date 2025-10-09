import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (body._type === "article") {
    revalidatePath(`/article/${body.slug?.current}`);
  }
  return NextResponse.json({ revalidated: true });
}
