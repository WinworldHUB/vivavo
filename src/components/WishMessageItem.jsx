/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WishMessageItem({ emails }) {
  const [flyIn, setFlyIn] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(0);
  const today = new Date();
  const currentTime = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const attachmentsBadge = function (attachments) {
    return (
      <span className="badge badge-primary">
        <i className="las la-paperclip"></i>
        {attachments.length}
      </span>
    );
  };

  return (
    <div className="wish-announcement-item row">
      <div className="col-sm-4">
        <div className="list-group" id={uuidv4()}>
          {emails &&
            emails.map((email, index) => {
              return (
                <a
                  key={parseInt(index)}
                  className={
                    "list-group-item list-group-item-action flex-column align-items-start " +
                    (parseInt(selectedEmail) === index ? "active" : "")
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEmail(parseInt(index));
                    setFlyIn(!flyIn);
                  }}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="text-bold-600 collapse-text w-75">
                      {email.subject ?? ""}
                    </h5>
                    <small className="text-muted text-right">
                      {email.timeStamp ?? currentTime}
                    </small>
                  </div>
                  <small className="text-muted">
                    {email.attachments && attachmentsBadge(email.attachments)}
                  </small>
                </a>
              );
            })}
        </div>
      </div>
      <div className="col-sm-8">
        <h5>Message: </h5>
        <p className="file-list">
          {selectedEmail && emails[parseInt(selectedEmail)].message}
        </p>
      </div>
      <div className="offset-sm-4 col-sm-8 d-flex justify-content-between align-items-center">
        {selectedEmail &&
          emails[parseInt(selectedEmail)].attachments &&
          emails[parseInt(selectedEmail)].attachments.map(
            (attachment, index) => {
              return (
                <a target="_blank" href={attachment.url}>
                  <i className="las la-paperclip"></i> {attachment.name}
                </a>
              );
            }
          )}
      </div>
    </div>
  );
}
