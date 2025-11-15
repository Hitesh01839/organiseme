"use client";

import React from "react";

const Btn = ({ text, ref, disabled, onClick, type }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      ref={ref}
      className="w-fit self-center max-md:w-[40vw] cursor-pointer px-8 py-2 hover:bg-black rounded-2xl text-[#0a0a0a] hover:text-white/80 font-semibold bg-white/80 backdrop-blur-md border border-[#f8f8f8]/20 shadow-[0_0_45px_rgba(255,255,255,0.5)] hover:shadow-[0_0_55px_rgba(255,255,255,0.6)] transition-all duration-300"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Btn;
