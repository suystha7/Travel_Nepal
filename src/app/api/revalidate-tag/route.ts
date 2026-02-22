import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tag, secret } = await req.json();

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    if (!tag) {
      return NextResponse.json({ message: "Missing tag" }, { status: 400 });
    }

    revalidateTag(tag, "default");

    return NextResponse.json({ revalidated: true });
  } catch (e) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
