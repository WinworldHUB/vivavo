/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import WishModal from "../WishModal";
import "./form.css";
import { v4 as uuidv4 } from "uuid";

export default function WishProfilePicture({
  label,
  initialValue = "",
  placeholder = "",
  required = false,
  inline = true,
}) {
  const elementId = "txt" + label.replace(" ", "");
  const hiddenPicId = uuidv4();
  const [profilePic, setProfilePic] = useState(initialValue);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="form-group row">
      <label htmlFor={elementId} className="col-4 col-form-label">
        {label}
      </label>
      <div className="col-8 d-flex align-items-center">
        {profilePic === "" ? (
          <Link
            className="card-link link-dotted"
            to=""
            data-toggle="modal"
            data-target={"#dlgSelectPic-" + elementId}
          >
            Select Picture
          </Link>
        ) : (
          <Link
            className="card-link link-dotted"
            to=""
            data-toggle="modal"
            data-target={"#dlgSelectPic-" + elementId}
          >
            View / Change Picture
          </Link>
        )}
      </div>
      <WishModal
        id={"dlgSelectPic-" + elementId}
        finishTitle="Set"
        title={"Select " + label}
      >
        <div className="text-center">
          <div className="d-flex justify-content-center">
            <div
              className="profile-pic"
              style={{
                backgroundImage: "url('" + profilePic + "')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <input
                type="file"
                id={hiddenPicId}
                name={hiddenPicId}
                className="hidden"
                onChange={onImageChange}
                accept="image/png, image/gif, image/jpeg"
              />
            </div>
          </div>
          <label
            htmlFor={hiddenPicId}
            className="card-link link-dotted clickable text-primary"
          >
            Select Image
          </label>
          <label
            className="card-link link-dotted clickable text-danger"
            onClick={() => {
              setProfilePic("");
            }}
          >
            Clear Image
          </label>
        </div>
      </WishModal>
    </div>
  );
}
