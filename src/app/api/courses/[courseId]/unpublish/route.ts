import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json("unauthenticated", { status: 401 });

    const { courseId } = await params;
    const course = await db.course.findUnique({
      where: {
        userId,
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) return NextResponse.json("not found", { status: 404 });

    const courseUpdated = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(courseUpdated, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 });
  }
}