import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {  IoSend } from "react-icons/io5";

import {  CiPhone, CiVideoOn } from "react-icons/ci";
import { MdOutlineEmojiEmotions, MdOutlineKeyboardVoice } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
const MessageContainer = () => {
    let selected=true
  return (
    <div>
      {selected ? (
        <>
          <div className=" h-screen flex flex-col justify-between ">
            <div className="p-3 border-b border-gray-400 bg-gray-100 text-white">
              <div className="flex  justify-between">
                <div className="flex gap-2 h-8  items-center">
                  <img
                    src="https://avatar.iran.liara.run/public"
                    alt="profile"
                    className="w-8"
                  />
                  <span className="text-xl">xyz</span>
                </div>

                <div className="flex gap-5 ">
                  <CiPhone size={30} />

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
                        className="px-2   "
                      />
                    </div>
                    <div className="flex gap-5">
                      <IoSend size={30} />
                      <MdOutlineKeyboardVoice size={30} />
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

export default MessageContainer;
