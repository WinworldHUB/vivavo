/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function WishImageBGCard({
  title = "",
  children,
  image = "",
  showEditButton = false,
  onEditClicked,
}) {
  return (
    <div class="card box-shadow-0 border-3 border-left-primary">
      <div class="card-content collapse show">
        <div
          class="card-body"
          style={{
            background:
              "url('../assets/app-assets/images/backgrounds/" + image + "')",
            backgroundSize: "contain",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <h4 class="card-title">{title}</h4>
            {showEditButton === true ? (
              <a
                className="text-primary"
                onClick={() => {
                  onEditClicked && onEditClicked();
                }}
              >
                <i className="las la-edit"></i>
              </a>
            ) : (
              ""
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
