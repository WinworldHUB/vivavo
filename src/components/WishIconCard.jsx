import React from "react";

export default function WishIconCard({
  icon = "la-user",
  title = "title",
  selected = false,
  onClicked,
}) {
  return (
    <div
      className={
        " clickable text-center h-100 p-2 " +
        (selected === true
          ? " bg-primary link-white text-white shadow "
          : " bg-white shadow-sm onhover-shadow ")
      }
      onClick={() => {
        onClicked && onClicked();
      }}
    >
      <p className="">
        <i className={"las la-2x " + icon}></i>
      </p>
      <p className="mb-0">{title}</p>
    </div>
  );
}
