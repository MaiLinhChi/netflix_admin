import clsx from "clsx";
import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineUser,
  AiFillPlayCircle,
  AiOutlineUnorderedList,
  AiOutlineMail,
  AiTwotoneBuild,
  AiOutlineMessage,
} from "react-icons/ai";

import style from "./Sidebar.module.scss";
import { routes } from "@/config";

const SideBar = () => {
  return (
    <div className={clsx(style.sidebar)}>
      <div className={clsx(style["wrapper-list"])}>
        <h3 className={clsx(style.title)}>Dashboard</h3>
        <ul className={clsx(style.list)}>
          <NavLink
            to={routes.home}
            className={(nav) => clsx(style.item, { active: nav.isActive })}
          >
            <AiFillHome className={clsx(style.icon)} />
            Home
          </NavLink>
        </ul>
      </div>
      <div className={clsx(style["wrapper-list"])}>
        <h3 className={clsx(style.title)}>Quick Menu</h3>
        <ul className={clsx(style.list)}>
          <NavLink
            to={routes.users}
            className={(nav) => clsx(style.item, { active: nav.isActive })}
          >
            <AiOutlineUser className={clsx(style.icon)} />
            Users
          </NavLink>
          <NavLink
            to={routes.movies}
            className={(nav) => clsx(style.item, { active: nav.isActive })}
          >
            <AiFillPlayCircle className={clsx(style.icon)} />
            Movies
          </NavLink>
          <NavLink
            to={routes.lists}
            className={(nav) => clsx(style.item, { active: nav.isActive })}
          >
            <AiOutlineUnorderedList className={clsx(style.icon)} />
            Lists
          </NavLink>
        </ul>
      </div>
      <div className={clsx(style["wrapper-list"])}>
        <h3 className={clsx(style.title)}>Notifications</h3>
        <ul className={clsx(style.list)}>
          <li className={clsx(style.item)}>
            <AiOutlineMail className={clsx(style.icon)} />
            Mail
          </li>
          <li className={clsx(style.item)}>
            <AiTwotoneBuild className={clsx(style.icon)} />
            Feedback
          </li>
          <li className={clsx(style.item)}>
            <AiOutlineMessage className={clsx(style.icon)} />
            Messages
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
