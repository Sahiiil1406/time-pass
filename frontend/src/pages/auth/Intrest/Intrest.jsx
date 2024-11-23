import React from 'react'
import { IoMdArrowBack } from "react-icons/io";

import { FaSearch } from "react-icons/fa";

const Intrest = () => {
  return (
    <div>
      <div className=" bg-white ">
        <div className="flex flex-col justify-between h-screen p-10">
          <div className="flex flex-col gap-10 ">
            <div className="flex justify-between">
              <span>
                <IoMdArrowBack
                  size={40}
                  className=" rounded-full p-2 bg-gray-200"
                />
              </span>
              <span>
                <img src="/formlogo.png" alt="logo" className="h-20 w-20" />
              </span>
              <span className=" h-10 rounded-full py-1.5 px-4  bg-gray-200 text-lg ">
                Skip
              </span>
            </div>
            <div className=" flex gap-2 justify-center ">
              <span className="font-bold text-xl ">Add Your Intrests</span>
            </div>
            <div className=" flex justify-center ">
              <div className="flex  py-2 w-80   bg-gray-200   px-5 rounded-3xl ">
                <span className=" pt-1 px-4 ]">
                  <FaSearch size={20} />
                </span>

                <input
                  type="text"
                  placeholder="Search Intrests"
                  className=" placeholder-gray-400  bg-gray-200   text-xl"
                />
              </div>
            </div>
            <div className="flex justify-center text-lg text-gray-500 ">
              This helps us to connect you with your college alumini and peers
            </div>
          </div>

          <div className="flex justify-center ">
            <button className="text-white bg-gray-400 py-2 px-24 w-80 h-12 rounded-3xl text-xl font-semibold">
              Continue
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Intrest
