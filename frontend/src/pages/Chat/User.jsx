import React from 'react'

const User = ({user}) => {
  return (
    <div className="p-3 ">
      <div className="flex justify-between gap-2 items-center ">
        <div className="flex justify-center gap-2">
          <div className="flex gap-2 h-8  items-center">
            <img
              src={`${user.pic}`}
              alt="profile"
              className="w-8"
            />
            <span className="text-xl">{user.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User
