import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthroized", { status: 401 });
    }
    const { title } = await req.json();
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.log("[COURSES]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
