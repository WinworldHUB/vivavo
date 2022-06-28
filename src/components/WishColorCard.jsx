import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function WishColorCard({
  bgColor,
  textColor,
  imagePath,
  title,
  action,
}) {
  return (
    <div
      className={"card text-center border-0 box-shadow-0 " + (bgColor ?? "")}
    >
      <div className="card-content">
        <div className="card-body">
          <img
            src={imagePath ?? ""}
            alt="element 02"
            width="225"
            className={"mb-1 img-fluid " + (imagePath ?? " hidden ")}
          />
          <h3 className={"card-title " + (textColor ?? "")}>{title ?? ""}</h3>
          <p className={"card-text " + (action ?? " hidden ")}>
            {action === undefined ? (
              ""
            ) : (
              <Link
                className={"btn " + (bgColor ?? " bg-primary ")}
                to={action.linkTo ?? ""}
              >
                {action.title ?? ""}
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
