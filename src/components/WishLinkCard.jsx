import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WishSimpleCard from "./WishSimpleCard";

export default function WishLinkCard({
  linkTitle,
  linkTo,
  background,
  showArrow,
  onClick,
}) {
  const navigate = useNavigate();

  const cardArrow = function () {
    return (
      <Link to={linkTo ?? ""} onClick={(e) => onClick && onClick(e)}>
        <i className="las la-angle-right"></i>
      </Link>
    );
  };

  const cardBody = function () {
    return (
      <div className="row d-flex align-items-center">
        <div className="col-10">
          <Link to={linkTo ?? ""} onClick={(e) => onClick && onClick(e)}>
            {linkTitle ?? "Link Title"}
          </Link>
        </div>
        <div className="col-2 text-right">{showArrow && cardArrow()}</div>
      </div>
    );
  };

  const onCardClicked = function (event) {
    event.preventDefault();
    onClick && onClick(event);
    navigate(linkTo ?? "");
  };

  return (
    <WishSimpleCard
      background={"hand-cursor " + background}
      body={cardBody()}
      onClick={onCardClicked}
    ></WishSimpleCard>
  );
}
