import React from "react";

const Input = ({ type, name, placeholder, ref }) => {
  return (
    <input
      className={`w-md max-md:w-[75vw] py-2 px-4 rounded-3xl outline-none bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300`}
      type={type}
      placeholder={placeholder}
      name={name}
      ref={ref}
    />
  );
};

export default Input;
