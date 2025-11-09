"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef([]);
  const router = useRouter();

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
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
    <section className="flex min-xl:-mt-20 min-xl:space-x-60 justify-center items-center max-md:my-30 min-lg:space-x-10 pt-[15%] text-white max-lg:flex-col max-lg:space-y-20">
      <div className="hero-section max-md:space-y-15 justify-center align-middle space-y-12 flex flex-col items-center">
        <div className="space-y-4 text-center">
          <p
            ref={(el) => (heroRef.current[0] = el)}
            className="text-9xl max-md:text-7xl font-bold"
          >
            Hello;
          </p>
          <p ref={(el) => (heroRef.current[1] = el)} className="text-xl italic">
            Where focus meets flow.
          </p>
        </div>

        <div className="flex max-md:items-center space-y-8 space-x-7 max-md:flex-col">
          <Button
            onClick={() => router.push("/login")}
            ref={(el) => (heroRef.current[3] = el)}
            className="group max-md:w-[40vw] cursor-pointer relative px-8 py-4 rounded-2xl text-[#0a0a0a] hover:text-white/80 font-semibold bg-white/80 backdrop-blur-md border border-[#f8f8f8]/20 shadow-[0_0_45px_rgba(255,255,255,0.5)] hover:shadow-[0_0_55px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            Get Started
            <span className="ml-0 transition-transform duration-300 ease-in-out group-hover:translate-x-2">
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>

      <Image
        ref={(el) => (heroRef.current[4] = el)}
        className="block backdrop-blur-3xl shadow-[10px_10px_45px_rgba(255,255,255,0.5)] h-auto w-[25vw] max-lg:h-60 max-lg:w-60"
        src="/hero.png"
        alt="hero"
        width={700}
        height={700}
        priority={false}
      ></Image>
    </section>
  );
};

export default Hero;
