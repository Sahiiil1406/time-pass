import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { CiPhone, CiVideoOn } from "react-icons/ci";
import { MdOutlineEmojiEmotions, MdOutlineKeyboardVoice } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
const Container = () => {
  let selected = true;
  return (
    <div className=" grid grid-cols-[80px,1fr] h-screen ">
      <div className="bg-gray-300">
        <div className="cursor-pointer flex flex-col items-center pl-8 my-10 ">
          <div className=" cursor-pointer flex flex-col gap-10 items-center justify-center ">
            <AiOutlineHome size={20} />

            <IoSearch size={20} />

            <LuSend size={20} />

            <FiPlusSquare size={20} />
          </div>
        </div>
      </div>

      {selected ? (
        <>
          {" "}
          <div className="  h-screen w-screen border border-black  flex flex-col justify-between ">
            <div className="p-3 border-b border-black  text-white">
              <div className="flex  justify-between">
                <span className="text-lg">xyz</span>
                <div className="flex gap-5 ">
                  <CiPhone size={30} />
                  <CiVideoOn size={30} />
                  <IoIosInformationCircleOutline size={30} />
                </div>
              </div>
            </div>
            <div className="overflow-hidden  h-[calc(100%-100px)] "></div>
            <div className="flex flex-col gap-1">
              <div>
                <form>
                  <div className="flex border-t border-black justify-between bg-white p-5">
                    <div className="flex  gap-5">
                      <MdOutlineEmojiEmotions size={30} />
                      <BsPlusLg size={30} />
                      <input
                        type="text"
                        placeholder="Enter your message "
                        className="px-2 text-sm "
                      />
                    </div>
                    <div className="flex gap-5">
                      <IoSend size={30} />
                      {/* <MdOutlineKeyboardVoice size={30} /> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col   flex-wrap justify-center gap-5 h-screen  items-center">
          <p className=" text-2xl">Your messages</p>
          <p className=" text-gray-500 text-lg">
            Send a message to start a chat
          </p>
          <button className="rounded-xl bg-blue-600 text-white p-2">
            Send message
          </button>
        </div>
      )}
    </div>
  );
};

export default Container;
