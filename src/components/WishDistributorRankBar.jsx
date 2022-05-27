import React, { Component, useState } from "react";

export default function WishDistributorRankBar({ currentProgress }) {
  const leftPosition = {
    left: (currentProgress ?? "20") + "%",
  };

  return (
    <div className="progress bg-progress">
      <div
        className="progress-start onhover-shadow onhover-change-border"
        data-toggle="tooltip"
        data-placement="top"
        title="Independent Distributor"
      >
        <i className="las la-2x la-check"></i>
      </div>
      <div
        className="progress-current"
        style={leftPosition}
        data-toggle="tooltip"
        data-placement="top"
        title="Current Rank"
      >
        <i className="las la-2x la-check text-muted"></i>
      </div>

      <div
        className="progress-end onhover-shadow onhover-change-border"
        data-toggle="tooltip"
        data-placement="top"
        title="Crown Black Diamond Executive"
      >
        <i className="las la-2x la-check text-muted"></i>
      </div>
      <div
        className="progress-bar progress-bar-sprint bar-1"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-success progress-bar-sprint bar-2"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-success progress-bar-sprint bar-3"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-success progress-bar-sprint bar-4"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-success progress-bar-sprint bar-5"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-success progress-bar-sprint bar-6"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-info progress-bar-sprint bar-7"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-danger progress-bar-sprint bar-8"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-danger progress-bar-sprint bar-9"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-light progress-bar-divider"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
      <div
        className="progress-bar bg-danger progress-bar-sprint bar-10"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
}
