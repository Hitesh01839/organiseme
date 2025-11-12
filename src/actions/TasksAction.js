"use server";

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoose } from "@/lib/mongodb";
import Task from "@/models/Task";

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

export const editTaskAction = async (formData) => {
  const id = formData.get("id");
  const new_title = formData.get("title");
  console.log(`this is edit and id is: ${id} and ${new_title}`);
};

export const changeTaskStatusAction = async (_id, newStatus) => {
  // TODO: set the status in database
  console.log(_id, newStatus);
};

export const deleteTaskAction = async (id) => {
  console.log(`this is delete and id is: ${id}`);
};
