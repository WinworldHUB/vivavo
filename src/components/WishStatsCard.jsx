import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function WishStatusCard({
  percentage,
  color,
  showTrail,
  linkTitle,
  linkTo,
}) {
  const enableTrail = showTrail === undefined ? false : showTrail;

  return (
    <div className="row">
      <div className="offset-sm-3 col-sm-6 pb-2">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={{
            path: {
              // Trail color
              stroke: color,
            },
            trail: {
              stroke: enableTrail === false ? "none" : "",
            },
          }}
        >
          <label className="text-break text-white text-center">
            Co-Applicant Profile
          </label>
        </CircularProgressbarWithChildren>
      </div>
      <div className="col-sm-6 white border-right-white text-center">
        <label className="completion-label">{percentage}</label>
        <p>% Complete</p>
      </div>
      <div className="col-sm-6 white text-center pt-2">
        <h5 className="text-white">Next Section</h5>

        <Link className="text-white link" to={linkTo ?? "/"}>
          {linkTitle ?? "Link Title"}{" "}
          <i className="las la-angle-right align-middle"></i>
        </Link>
      </div>
    </div>
  );
}
