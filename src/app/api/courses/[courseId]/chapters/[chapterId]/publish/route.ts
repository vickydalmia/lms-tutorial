import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json("unauthenticated", { status: 401 });

    const { chapterId, courseId } = await params;
    const ownCourse = db.course.findUnique({
      where: {
        userId,
        id: courseId,
      },
    });
    if (!ownCourse) return NextResponse.json("unauthorized", { status: 403 });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: chapterId,
      },
    });

    if (!chapter || !chapter.title || !chapter.description || !muxData) {
      return NextResponse.json("Bad request", { status: 400 });
    }

    const chapterUpdated = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(chapterUpdated, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 });
  }
}
