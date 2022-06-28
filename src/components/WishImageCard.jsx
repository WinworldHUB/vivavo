import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export default function WishImageCard({
  overlayColor,
  title,
  subTitle,
  imagePath,
  content,
  action,
}) {
  return (
    <div className="card text-white border-0 box-shadow-0">
      <div className="card-content">
        <img className="card-img img-fluid" src={imagePath ?? ""} alt="" />
        <div
          className={
            "card-img-overlay " + (overlayColor ?? " overlay-blue-grey ")
          }
        >
          <h4 className="card-title text-white">{title ?? null}</h4>
          <p className="card-text">{parse(content ?? "")}</p>
          <p className="card-text">
            <small className="text-muted">{subTitle ?? null}</small>
          </p>
          {/* <Link
            className="btn btn-primary"
            to={action && (action.linkTo ?? "")}
          >
            {action && (action.title ?? "")}
          </Link> */}
        </div>
      </div>
    </div>
  );
}
