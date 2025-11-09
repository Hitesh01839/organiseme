"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Input from "@/components/Input";
import Btn from "@/components/Btn";
import TaskCard from "@/components/TaskCard";
import { addTaskAction } from "@/actions/TasksAction";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const tasksRef = useRef([]);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    gsap.fromTo(
      tasksRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.in",
        stagger: 0.2,
      }
    );
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  return (
    <section className="text-white max-sm:absolute max-sm:top-16">
      <div className="add-tasks flex flex-col justify-center items-center align-middle space-y-10">
        <h1
          ref={(el) => (tasksRef.current[0] = el)}
          className="mt-2 text-4xl max-md:text-2xl"
        >
          Enter your task
        </h1>

        {/* onSubmit sends the formData to the addTasksAction  */}
        <form action={addTaskAction} className="flex flex-col space-y-8">
          <Input
            type={"text"}
            name={"title"}
            placeholder={"Title"}
            ref={(el) => (tasksRef.current[1] = el)}
          />
          <Input
            type={"text"}
            name={"description"}
            placeholder={"Description"}
            ref={(el) => (tasksRef.current[2] = el)}
          />
          <Btn text="Add task" ref={(el) => (tasksRef.current[3] = el)} />
        </form>
      </div>
      <div ref={(el) => (tasksRef.current[4] = el)} className="tasks">
        <TaskCard />
      </div>
    </section>
  );
};

export default page;
