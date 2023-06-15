import MyInput from "components/MyInput";
import SearchBox from "components/SearchBox";
import useAPI from "hooks/useApi";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "services/manager";
import validator from "validator";

const UserSearch = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const getUserRequest = useAPI({ queryFn: (params) => getUser(params) });
  const handleSearch = () => {
    if (validator.isEmail(email))
      getUserRequest
        .run({ user_email: email })
        .then((res) => {
          setUser(res);
        })
        .catch((err) => {
        });
  };
  return (
    <div className="flex flex-col p-4 bg-[#F8F9FB] rounded-[12px] w-full">
      <SearchBox
        loading={getUserRequest.loading}
        label="User email"
        placeholder="Find user with email"
        value={email}
        setValue={(value) => setEmail(value)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default UserSearch;
