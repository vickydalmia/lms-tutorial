interface CourseIDPageProps {
  params: Promise<{ courseId: string }>;
}
export default async function CourseIDPage({ params }: CourseIDPageProps) {
  const { courseId } = await params;

  return <div>{courseId}</div>
}
