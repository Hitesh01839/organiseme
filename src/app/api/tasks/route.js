import { connectMongoose } from "@/lib/mongodb";
import { auth } from "../auth/[...nextauth]/route";
import Task from "@/models/Task";

// API endpoint to fetch all tasks
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

// API endpoint to update a task
export async function PATCH(req) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { id, title, description } = body;

    await connectMongoose();

    const updated = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updated) {
      return Response.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: updated });
  } catch (err) {
    console.error(err);
  }
}
