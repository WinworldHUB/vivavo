import React from "react";

export default function WishFlexBox({ children, className = "" }) {
  return (
    <div
      className={
        "d-flex justify-content-between align-items-center " + className
      }
    >
      {children}
    </div>
  );
}
