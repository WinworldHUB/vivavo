import React from "react";

export default function WishSimpleCard({
  background,
  textColor,
  header,
  body,
  footer,
  className,
  onClick,
}) {
  const hasBackground = () => {
    return background !== undefined ? true : false;
  };

  const hasTextColor = () => {
    return textColor !== undefined ? true : false;
  };

  const hasShadow = () => {
    if (hasBackground() === true) {
      if (background.includes("box-shadow-")) {
        if (background.includes("box-shadow-0")) {
          return false;
        }

        return true;
      }
    }

    return false;
  };

  return (
    <div
      className={
        "card onhover-change-border " +
        (hasBackground() && " " + background + " ") +
        (hasShadow() === true ? " " : " box-shadow-0 onhover-shadow ") +
        (className ?? (className && " " + className + " "))
      }
      onClick={(e) => onClick && onClick(e)}
    >
      {header && (
        <div
          className={
            "card-header " +
            (hasTextColor() && textColor) +
            (header ?? " hidden ")
          }
        >
          {header}
        </div>
      )}
      {body && (
        <div className={"card-body " + (hasTextColor() && textColor)}>
          {body}
        </div>
      )}
      {footer && (
        <div className="card-footer border-top-lighten-5">{footer}</div>
      )}
    </div>
  );
}
