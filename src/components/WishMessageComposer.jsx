import React from "react";
import WishSimpleCard from "./WishSimpleCard";
import WishToaster from "./WishToaster";
import WishUploadFiles from "./WishUploadFiles";

export default function WishMessageComposer({ mailSubjects, onSent }) {
  const composeMessage = function () {
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="ddTitle" className="col-sm-3 col-form-label">
            Subject
          </label>
          <div className="col-sm-9">
            <select
              id="ddTitle"
              name="ddTitle"
              className="custom-select"
              required="required"
            >
              {mailSubjects &&
                mailSubjects.map((subject, index) => {
                  return <option value={index}>{subject}</option>;
                })}
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtMessage" className="col-sm-3 col-form-label">
            Message
          </label>
          <div className="col-sm-9">
            <textarea
              id="txtMessage"
              name="txtMessage"
              className="form-control"
              required="required"
              rows="10"
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtAttachment" className="col-sm-3 col-form-label">
            Attachments
          </label>
          <div className="col-sm-9">
            <WishUploadFiles
              hideUploadButton
              addButtonTitle="Add Attachment"
            ></WishUploadFiles>
          </div>
        </div>
      </div>
    );
  };

  return (
    <WishSimpleCard
      body={composeMessage()}
      footer={
        <button
          className="btn btn-primary ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            WishToaster({
              toastMessage: "Message sent successfully",
              toastType: "success",
            });
            onSent && onSent();
          }}
        >
          <i className="las la-paper-plane"></i> Send Message
        </button>
      }
    ></WishSimpleCard>
  );
}
