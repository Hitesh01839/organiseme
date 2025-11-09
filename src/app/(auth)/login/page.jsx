"use client";

import React, { useActionState } from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { loginUserAction } from "@/actions/AuthUser";

import Input from "@/components/Input";
import Btn from "@/components/Btn";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const loginRef = useRef([]);

  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [state, formAction, pending] = useActionState(loginUserAction, {
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
      loginRef.current,
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
          ref={(el) => (loginRef.current[0] = el)}
          className="text-white text-8xl max-md:text-5xl font-bold"
        >
          LOGIN
        </h1>

        {/* onSubmit sends the formData to the loginUserAction  */}
        <form
          action={formAction}
          className="login-form flex flex-col justify-center align-middle items-center space-y-10"
        >
          <Input
            type={"email"}
            name={"email"}
            placeholder={"Email"}
            ref={(el) => (loginRef.current[1] = el)}
          />
          <Input
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            ref={(el) => (loginRef.current[2] = el)}
          />

          {state?.message && (
            <p
              className={`${state.success ? "text-green-400" : "text-red-400"}`}
            >
              {state.message}
            </p>
          )}

          <Btn
            text={pending ? "Logging in..." : "Login"}
            ref={(el) => (loginRef.current[3] = el)}
            disabled={pending}
          />
        </form>
      </div>

      <Image
        ref={(el) => (loginRef.current[4] = el)}
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
