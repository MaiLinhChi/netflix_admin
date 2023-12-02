import { useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { AiFillBell, AiOutlineGlobal } from "react-icons/ai";

import style from "./Navbar.module.scss";
import { AuthContext } from "@/context/auth/AuthContext";
import config from "@/config";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={clsx(style.navbar)}>
      <div className={clsx(style.left)}>
        <Link to={config.routes.home} className={clsx(style.logo)}>
          Linh Chí
        </Link>
      </div>
      <div className={clsx(style.right)}>
        <div className={clsx(style["wrapper-icon"])}>
          <AiFillBell className={clsx(style.icon)} />
          <span className={clsx(style.badge)}>2</span>
        </div>
        <div className={clsx(style["wrapper-icon"])}>
          <AiOutlineGlobal className={clsx(style.icon)} />
          <span className={clsx(style.badge)}>4</span>
        </div>
        <img
          src={user.profilePicture}
          alt={user.userName}
          className={clsx(style.avatar)}
        />
      </div>
    </div>
  );
};

export default Navbar;
