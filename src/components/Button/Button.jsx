import clsx from "clsx";
import { Link } from "react-router-dom";

import style from "./Button.module.scss";

const Button = ({
  aqua = false,
  lightcoral = false,
  gray = false,
  steal = false,
  darkblue = false,
  small = false,
  disable = false,
  href,
  to,
  className,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...passProps
}) => {
  let Component = "button";
  const props = {
    onClick,
    ...passProps,
  };
  if (href) {
    Component = "a";
    props.href = href;
  } else if (to) {
    Component = Link;
    props.to = to;
  }

  if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  const classes = clsx(style.button, {
    [style.aqua]: aqua,
    [style.gray]: gray,
    [style.lightcoral]: lightcoral,
    [style.steal]: steal,
    [style.darkblue]: darkblue,
    [style.small]: small,
    [style.disable]: disable,
    [className]: className,
  });
  return (
    <Component className={classes} {...props}>
      {leftIcon && <span className={clsx(style["left-icon"])}>{leftIcon}</span>}
      <span className={clsx(style.title)}>{children}</span>
      {rightIcon && (
        <span className={clsx(style["right-icon"])}>{leftIcon}</span>
      )}
    </Component>
  );
};

export default Button;
