import MyInput from "components/MyInput";
import useAPI from "hooks/useApi";
import React, { useState } from "react";
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
        .catch((err) => {});
  };
  return (
    <div className="flex flex-col">
      <MyInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="User email"
        placeholder="Find user with email"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
    </div>
  );
};

export default UserSearch;
