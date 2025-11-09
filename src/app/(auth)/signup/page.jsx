"use client";

import React, { useActionState } from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { signUpUserAction } from "@/actions/AuthUser";

import Input from "@/components/Input";
import Btn from "@/components/Btn";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const signUpref = useRef([]);

  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [state, formAction, pending] = useActionState(signUpUserAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (status === "authenticated") router.replace("/tasks");
  }, [status, router]);

  useEffect(() => {
    if (state && state.success) {
      update();
      router.push("/tasks");
    }
  }, [state, session]);

  useEffect(() => {
    gsap.fromTo(
      signUpref.current,
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

  return (
    <section className="login-section flex justify-center items-center align-middle min-lg:space-x-28 min-xl:space-x-60 text-white">
      <div className="text-white flex flex-col space-y-10 justify-center items-center align-middle h-[80vh]">
        <h1
          ref={(el) => (signUpref.current[0] = el)}
          className="text-white text-8xl max-md:text-5xl font-bold"
        >
          REGISTER
        </h1>

        {/* onSubmit sends the formData to the signUpUserAction  */}
        <form
          action={formAction}
          className="login-form flex flex-col justify-center align-middle items-center space-y-10"
        >
          <Input
            ref={(el) => (signUpref.current[1] = el)}
            placeholder={"Email"}
            name={"email"}
            type={"email"}
          />

          <Input
            ref={(el) => (signUpref.current[2] = el)}
            placeholder={"Username"}
            name={"username"}
            type={"text"}
          />

          <Input
            ref={(el) => (signUpref.current[3] = el)}
            placeholder={"Password"}
            name={"password"}
            type={"password"}
          />

          {state?.message && (
            <p
              className={`${state.success ? "text-green-400" : "text-red-400"}`}
            >
              {state.message}
            </p>
          )}

          <Btn
            text={pending ? "Registering..." : "Register"}
            ref={(el) => (signUpref.current[4] = el)}
            disabled={pending}
          />
        </form>
      </div>

      <Image
        ref={(el) => (signUpref.current[5] = el)}
        priority={true}
        className="block backdrop-blur-3xl shadow-[10px_10px_45px_rgba(255,255,255,0.5)] max-lg:hidden h-auto w-[25vw]"
        src="/login.png"
        alt="hero"
        width={700}
        height={700}
      ></Image>
    </section>
  );
};

export default page;
