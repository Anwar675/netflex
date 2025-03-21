import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string | '';
  label: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (  
    <div className="py-1 pt-3 w-full relative">
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        
        className="w-full px-3 pb-2 pt-4 bg-opacity-40 bg-gray-600 appearance-none focus:outline-white peer"
        placeholder=""
      />
      <label
        className="absolute text-md text-zinc-400 duration-150 transform -translate-y-4 scale-75 top-6 z-10 origin-[0] left-3  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-[14px]"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
