import React from 'react'
import User from './User';

const Users = () => {
   const users = [
     {
       index: 1,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 2,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 3,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 4,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 5,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 6,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 7,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 8,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 9,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
     {
       index: 10,
       name: "xyz",
       pic: "https://avatar.iran.liara.run/public",
     },
   ];
  return (
    <div className="flex flex-col justify-center gap-5 py-5 mx-5">
      {users.map((user) => (
       
          <div
            key={user.index}
            
          >
            <div
              className='w-52 hover:bg-gray-200 duration-300 
              '
            >
              <User user={user} />
            </div>
          </div>
        
      ))}
    </div>
  );
}

export default Users
