import {
  changeTaskStatusAction,
  deleteTaskAction,
} from "@/actions/TasksAction";
import { MdDelete, MdEdit } from "react-icons/md";
import EditTaskModal from "./EditTaskModal";
import { myTasks } from "@/lib/data.json";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TaskCard = () => {
  const [toggle, setToggle] = useState(false);
  const [_id, setId] = useState("");

  const modalRef = useRef(null);

  const handleStatusChange = (_id, newStatus) => {
    changeTaskStatusAction(_id, newStatus);
  };

  const toggleModal = async (id) => {
    toggle ? setToggle(false) : setToggle(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setId(id);
  };

  useEffect(() => {
    if (toggle && modalRef.current) {
      // Animate when modal opens
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: -50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
        }
      );
    }
  }, [toggle]);

  return (
    <div className="relative z-10 flex flex-col justify-center align-middle items-center task-card mt-6 p-4">
      {toggle && (
        <div
          ref={modalRef}
          className="absolute text-xl -top-2 z-30 max-md:w-xl max-sm:w-sm w-3xl"
        >
          <EditTaskModal id={_id} toggle={toggle} />
        </div>
      )}
      <h1 className="m-4 text-3xl max-md:text-xl">Your Tasks</h1>
      <div className="task-cards space-y-4">
        {myTasks.map((task) => (
          <div
            key={task._id}
            className="task flex justify-between items-center px-6 mx-5 space-y-2 rounded-2xl p-4 backdrop-blur-2xl border border-white/20 bg-white/10 space-x-4"
          >
            <div className="task-data flex space-x-4">
              <input
                className="accent-[#0a0a0a]"
                type="checkbox"
                checked={task.status === "completed"}
                onChange={(e) =>
                  handleStatusChange(
                    task._id,
                    e.target.checked ? "completed" : "pending"
                  )
                }
              />
              <div className="space-y-2">
                <h4 className="font-bold">{task.title}</h4>
                <p className="pr-1">{task.description}</p>
              </div>
            </div>
            <div className="task-btn">
              <div className="flex px-2 space-x-4">
                <button
                  className="cursor-pointer"
                  onClick={() => deleteTaskAction(task._id)}
                >
                  <MdDelete />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={() => toggleModal(task._id)}
                >
                  <MdEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
