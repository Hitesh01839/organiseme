import { connectMongoose } from "@/lib/mongodb";
import { auth } from "../auth/[...nextauth]/route";
import Task from "@/models/Task";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoose();

    const tasks = await Task.find({ userId: session.user.id }).lean();

    return Response.json(tasks);
  } catch (err) {
    console.error(err);
  }
}
