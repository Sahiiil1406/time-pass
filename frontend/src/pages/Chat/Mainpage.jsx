import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

import All from "./mobile/All";
import Container from "./mobile/Container";


const Mainpage = () => {
      let selected = true;
  return (
    <div>
      <div className="small h-screen">
        {selected ? (
          <>
          
              <Container />
           
          </>
        ) : (
          <>
          
            <All />
          </>
        )}
      </div>
      <div className="big">
        <div className=" grid grid-cols-[320px,1fr] w-screen max-h-screen ">
          <section>
            <Sidebar />
          </section>

          <section>
            <MessageContainer />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
