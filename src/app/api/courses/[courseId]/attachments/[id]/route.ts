import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ courseId: string; id: string }> }
) => {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json("unauthenticated", { status: 401 });
    const { courseId, id } = await params;

    const courseOwner = await db.course.findUnique({
      where: {
        userId: userId,
        id: courseId,
      },
    });

    if (!courseOwner) {
      return NextResponse.json("unauthorized", { status: 403 });
    }

    await db.attachment.delete({
      where: {
        courseId: courseId,
        id: id,
      },
    });
    return NextResponse.json("deleted", { status: 201 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(e.message, { status: e.status });
  }
};
