/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useEffect } from "react";

export default function WishImageBGCard({
  title = "",
  children,
  image = "",
  showEditButton = false,
  showSaveButton = false,
  onEditClicked,
}) {
  const renderEditButton = function () {
    if (showEditButton) {
      return (
        <a
          className="text-primary"
          onClick={() => {
            //setCurrentMode("edit");
            onEditClicked && onEditClicked("edit");
          }}
        >
          <i className="las la-edit"></i>
        </a>
      );
    }

    if (showSaveButton) {
      return (
        <a
          className="text-primary card-link link-dotted"
          onClick={() => {
            //setCurrentMode("display");
            onEditClicked && onEditClicked("display");
          }}
        >
          Save
        </a>
      );
    }
  };

  return (
    <div
      class="card box-shadow-0 border-3 border-left-primary"
      style={{ marginLeft: "-12px", width: "103%"}}
    >
      <div class="card-content collapse show">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-start">
            <h4 class="card-title">{title}</h4>
            {renderEditButton()}
          </div>
        </div>
        <div
          class="card-body"
          style={{
            background:
              "url('../assets/app-assets/images/backgrounds/" + image + "')",
            backgroundSize: "contain",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
