import React from "react";
import WishFlexBox from "./WishFlexBox";

export default function WishSimpleCard({
  background,
  textColor,
  header,
  body,
  footer,
  className,
  onClick,
  children,
  cardBodyClassName,
  cardBodyProps = {},
  cardProps = {},
  changeBorder = true,
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
        "card " +
        (changeBorder ? " onhover-change-border " : "") +
        (hasBackground() && " " + background + " ") +
        (hasShadow() === true ? " " : " box-shadow-0 onhover-shadow ") +
        (className ?? (className && " " + className + " "))
      }
      onClick={(e) => onClick && onClick(e)}
      {...cardProps}
    >
      {header && (
        <div
          className={
            "card-header  " +
            (hasTextColor() && textColor) +
            (header ?? " hidden ")
          }
        >
          {header}
        </div>
      )}
      <div
        className={
          "card-body " + cardBodyClassName + " " + (hasTextColor() && textColor)
        }
        {...cardBodyProps}
      >
        {body ?? children}
      </div>
      {footer && (
        <WishFlexBox className="card-footer border-top-lighten-5 align-items-baseline">
          {footer}
        </WishFlexBox>
      )}
    </div>
  );
}
