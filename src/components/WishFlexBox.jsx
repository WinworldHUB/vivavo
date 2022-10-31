import React from "react";

export default function WishFlexBox({
  children,
  className = "",
  justifyContent = "between",
  alignItems = "center",
}) {
  return (
    <div
      className={
        "d-flex justify-content-" +
        justifyContent +
        " align-items-" +
        alignItems +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}
