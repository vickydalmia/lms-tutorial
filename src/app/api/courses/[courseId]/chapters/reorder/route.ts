import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json("Unauthroized", { status: 401 });
    const { courseId } = await params;
    const courseOwner = await db.course.findUnique({
      where: {
        userId: userId,
        id: courseId,
      },
    });
    if (!courseOwner) return NextResponse.json("unauthroised", { status: 403 });
    const { list } = await req.json();
    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
    return NextResponse.json("success", { status: 201 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(e.message, { status: 500 });
  }
}
