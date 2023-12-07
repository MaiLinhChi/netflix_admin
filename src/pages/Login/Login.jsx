import { useState, useContext } from "react";
import clsx from "clsx";

import { login } from "@/context/auth/AuthApi";
import { AuthContext } from "@/context/auth/AuthContext";
import style from "./Login.module.scss";
import Button from "@/components/Button";
import { LoadingContext } from "@/context/loading/LoadingContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return;
    }
    login({ email, password }, dispatch, setLoading);
  };

  const handleChangeEmail = (e) => {
    if (e.target.value[0] !== " ") {
      setEmail(e.target.value);
    }
  };

  const handleChangePassword = (e) => {
    if (e.target.value[0] !== " ") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className={clsx(style.login)}>
      <div className={clsx(style["wrapper-form"])}>
        <form className={clsx(style.form)}>
          <h2 className={style.title}>Sign In</h2>
          <div className={clsx(style["wrapper-input"])}>
            <input
              type="text"
              className={clsx(style.input)}
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <label className={clsx(style.label)}>Email adress</label>
            <i></i>
          </div>
          <div className={clsx(style["wrapper-input"])}>
            <input
              type="password"
              className={clsx(style.input)}
              value={password}
              onChange={handleChangePassword}
              required
            />
            <label className={clsx(style.label)}>Password</label>
            <i></i>
          </div>
          <Button
            lightcoral
            className={clsx(style["custom-btn"])}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
