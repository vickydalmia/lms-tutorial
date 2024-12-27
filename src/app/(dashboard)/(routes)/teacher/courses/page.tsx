import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function getData(): Promise<any> {
  const { userId } = await auth();
  if (!userId) return redirect("/");
  const courses = await db.course.findMany({
    where: {
      userId,
    },
  });
  return courses;
}

const CoursePage = async () => {
  const data = await getData();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursePage;
