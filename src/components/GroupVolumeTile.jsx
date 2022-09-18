import React from "react";
import WishFlexBox from "../../components/WishFlexBox";

export default function GroupVolumeTile({ details, addTopPadding = false }) {
  return (
    <div className={addTopPadding ? "pt-1" : ""}>
      <div className="border border-light p-1 rounded-lg onhover-shadow">
        <label className="text-primary card-title ">{details.title}</label>
        <WishFlexBox>
          <span className="lead">{details.subTitle}</span>
          <span className="lead font-weight-bold d-flex align-items-center">
            <i
              className={
                "las " +
                (details.direction === "up"
                  ? "la-long-arrow-alt-up text-success"
                  : "la-long-arrow-alt-down text-danger")
              }
            ></i>{" "}
            {details.PV}
          </span>
          <span
            className={
              "lead font-weight-bold " +
              (details.direction === "up" ? "text-success" : "text-danger")
            }
          >
            {details.percentage}
          </span>
        </WishFlexBox>
      </div>
    </div>
  );
}
