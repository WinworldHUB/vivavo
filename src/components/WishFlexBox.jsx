import React from "react";

export default function WishFlexBox({
  children,
  className = "",
  justifyContent = "between",
}) {
  return (
    <div
      className={
        "d-flex align-items-center justify-content-" +
        justifyContent +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}
