import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./common/Button";


export const Login = (props) => {
  const { onLogin } = props;
  const [currentUser, setCurrentUser] = useState({ username: "", password: "", name: "" });

  return (
    <div className="flex space-x-4 flex-row rounded-lg overflow-hidden">
      <input
        id="username"
        type="username"
        placeholder="Username"
        value={currentUser.username}
        onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
        onInvalid={(e) => e.preventDefault()}
        className="font-sans mt-1 block w-[291px] rounded-[14px] p-[12px] bg-white border text-sm shadow-sm placeholder-slate-400 focus:outline-none invalid:border-red-400 invalid:bg-red-50"
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={currentUser.password}
        onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
        className="font-sans mt-1 block w-[291px] rounded-[14px] p-[12px] bg-white border text-sm shadow-sm placeholder-slate-400 focus:outline-none invalid:border-red-400 invalid:bg-red-50"
      />
      <Button
        variant="primary"
        label="Log in"
        onClick={() => {
          onLogin(currentUser);
        }}
      />
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;