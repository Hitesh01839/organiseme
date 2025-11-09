import { editTaskAction } from "@/actions/TasksAction";
import Input from "./Input";
import { useState } from "react";
import Btn from "./Btn";

const EditTaskModal = ({ id, toggle }) => {
  const [_toggle, setToggle] = useState(toggle);
  return (
    <>
      {_toggle && (
        // onSubmit sends the formData to the editTaskAction
        <form
          className="flex flex-col bg-[#0a0a0a] backdrop-blur-xl align-middle items-center rounded-2xl p-10 m-4 space-y-6"
          action={editTaskAction}
        >
          <div className="flex w-xl max-sm:w-xs justify-between">
            <h3 className="font-semibold">Edit Task</h3>
            <button
              className="font-bold cursor-pointer"
              value={toggle}
              onClick={(prevState) => setToggle(!prevState)}
            >
              x
            </button>
          </div>
          <input type="hidden" name="id" value={id} />
          <Input name="title" type="text" placeholder="New title" />
          <Input name="description" type="text" placeholder="New description" />
          <Btn
            onClick={(prevState) => setToggle(!prevState)}
            value={_toggle}
            type="submit"
            text="Submit"
          ></Btn>
        </form>
      )}
    </>
  );
};

export default EditTaskModal;
