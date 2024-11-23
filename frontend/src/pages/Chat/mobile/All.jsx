import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import Users from "../Users";

const All = () => {
  return (
    <div className=" grid grid-cols-[60px,1fr] ">
      <div className="bg-gray-300">
        <div className="cursor-pointer flex flex-col items-center my-10 ">
          <div className=" cursor-pointer flex flex-col gap-10 items-center justify-center ">
            <AiOutlineHome size={20} />

            <IoSearch size={20} />

            <LuSend size={20} />

            <FiPlusSquare size={20} />
          </div>
        </div>
      </div>

      <div className="h-screen  w-screen py-10">
        <div className="flex flex-col  gap-5">
          <div className="flex justify-center items-center h-10  gap-1">
            <span>
              <img src="/formlogo.png" alt="logo" className="h-12 w-12" />
            </span>
            <span className="text-2xl">Synkerr</span>
          </div>
          <div>
            <form className="flex items-center justify-center flex-wrap   gap-2 ">
              <div className="border border-black rounded-lg flex items-center justify-center flex-wrap   gap-2  h-10 w-56 ">
                <input
                  className=" outline-none"
                  type="text"
                  placeholder="Search..."
                />
                <button type="submit">
                  <BiSearchAlt2 size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className=" h-[calc(100%-200px)]  overflow-auto mt-10">
          <div className="flex justify-center">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
};

export default All;
