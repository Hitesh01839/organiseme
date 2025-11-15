import Input from "./Input";
import Btn from "./Btn";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditTaskModal = ({ id, toggle }) => {
  const [_toggle, setToggle] = useState(toggle);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");

    const res = await fetch("/api/tasks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        description,
      }),
    });

    const data = await res.json();
    router.refresh();
  };

  return (
    <>
      {_toggle && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-[#0a0a0a] backdrop-blur-xl align-middle items-center rounded-2xl p-10 m-4 space-y-6"
        >
          <div className="flex w-xl max-sm:w-xs justify-between">
            <h3 className="font-semibold">Edit Task</h3>
            <button
              type="button"
              className="font-bold cursor-pointer"
              value={toggle}
              onClick={(prevState) => setToggle(!prevState)}
            >
              x
            </button>
          </div>
          <Input name="title" type="text" placeholder="New title" />
          <Input name="description" type="text" placeholder="New description" />
          <Btn type="submit" text="Submit"></Btn>
        </form>
      )}
    </>
  );
};

export default EditTaskModal;
