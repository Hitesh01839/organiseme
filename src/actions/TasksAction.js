"use server";

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoose } from "@/lib/mongodb";
import Task from "@/models/Task";

// Server action to add a task
export const addTaskAction = async (prevState, formData) => {
  const title = formData.get("title").toString();
  const description = formData.get("description").toString();

  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authorized");
  }

  await connectMongoose();

  const task = await Task.create({
    userId: session.user.id,
    title,
    description,
  });

  return {
    success: true,
    message: "Added successfully!",
  };
};

// Server action to delete a task
export const deleteTaskAction = async (id) => {
  console.log(`this is delete and id is: ${id}`);

  const session = await auth();

  if (!session?.user) {
    throw new Error("Not Authorized!");
  }

  await connectMongoose();

  const task = await Task.findByIdAndDelete(id);

  return {
    success: true,
    message: "Deleted successfully!",
  };
};
