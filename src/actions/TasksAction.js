"use server";

// TODO: connect to api to store data to databse

export const addTaskAction = async (formData) => {
  const title = formData.get("title");
  const description = formData.get("description");

  console.log({ title, description });
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
