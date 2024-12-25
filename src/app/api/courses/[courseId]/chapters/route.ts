import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json("unauthenticated", { status: 401 });
    const { courseId } = await params;
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });
    if (!courseOwner) return NextResponse.json("Unauthroised", { status: 403 });

    const { title } = await req.json();

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: courseId,
      },
      orderBy: {
        position: "desc",
      },
    });
    const newPosition = lastChapter ? lastChapter.position + 1 : 1;
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });
    return NextResponse.json(chapter, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 });
  }
}
