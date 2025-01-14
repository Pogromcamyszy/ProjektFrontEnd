import { useState } from "react";
import User from "./ILogin.tsx";

export default function Login() {
  const [user, setUser] = useState<User>({ user_nickname: "", user_password: "" });

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, user_nickname: e.target.value });
  };

  const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, user_password: e.target.value });
  };
  return (
    <>
      <input
        type="text"
        value={user.user_nickname}
        onChange={handleUserNameChange}
      />
      <br />
      <input
        type="password"
        value={user.user_password}
        onChange={handleUserPasswordChange}
      />
      <br />
      <button >Send</button>
      <button >Show</button>
      <br />
      {user.user_nickname} {user.user_password}
    </>
  );

}