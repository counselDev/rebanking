import React, { useState } from "react";

const EditCustomer = () => {
  const [userInfo, setUserInfo] = useState();
  return (
    <div>
      <div className="rounded-full h-28 w-28 bg-indigo-600 flex items-center justify-center text-4xl text-white font-bold">
        <span>{userInfo.firstname.slice(0, 1)}</span>
        <span>{userInfo.lastname.slice(0, 1)}</span>
      </div>
    </div>
  );
};

export default EditCustomer;
