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
  const new_description = formData.get("description");

  console.log(new_title);

  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authorized");
  }

  await connectMongoose();

  const task = await Task.findByIdAndUpdate(
    {
      title: new_title,
      description: new_description,
    },
    id
  );

  return {
    success: true,
    message: "Updated successfully!",
  };
};

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
