/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WishColoredBar from "./WishColoredBar";

export default function WishMessageItem({
  emails,
  showReply,
  recentMessageView,
}) {
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

  const renderNormalView = function () {
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
          <div className="row d-flex align-items-center">
            <div className="col-9">
              <h5>Message: </h5>
            </div>
            <div className="col-3 text-right">
              <a className={"card-link link-dotted " + (showReply ?? "d-none")}>
                <i className="las la-reply"></i> &nbsp;Reply
              </a>
            </div>

            <div className="col-12">
              <p className="file-list">
                {selectedEmail && emails[parseInt(selectedEmail)].message}
              </p>
            </div>
            <div className="col-sm-12 d-flex justify-content-between align-items-center pb-1">
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
            <div
              className={
                "col-12 pt-2 " +
                (emails[selectedEmail].recentMessages ?? "d-none")
              }
            >
              <div className="row">
                <div
                  className={
                    "col-12 " +
                    (emails[selectedEmail].recentMessages ?? "d-none")
                  }
                >
                  <WishColoredBar
                    message="Recent Messages"
                    bgcolor="light"
                  ></WishColoredBar>
                </div>
                <div className="col-12">
                  {emails[selectedEmail].recentMessages === undefined ? (
                    "No recent messages found"
                  ) : (
                    <WishMessageItem
                      recentMessageView
                      showReply
                      emails={emails[selectedEmail].recentMessages}
                    ></WishMessageItem>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRecentMessageView = function () {
    return (
      <div className="wish-announcement-item row">
        <div className="col-12">
          <div className="row d-flex align-items-center">
            <div className="col-9">
              <h5>Message: </h5>
            </div>
            <div className="col-3 text-right">
              <a className={"card-link link-dotted " + (showReply ?? "d-none")}>
                <i className="las la-reply"></i> &nbsp;Reply
              </a>
            </div>

            <div className="col-12">
              <p className="file-list">
                {emails[parseInt(selectedEmail)].message}
              </p>
            </div>
            <div className="col-sm-12 d-flex justify-content-between align-items-center pb-1">
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
            <div
              className={
                "col-12 pt-2 " +
                (emails[selectedEmail].recentMessages ?? "d-none")
              }
            >
              <div className="row">
                <div
                  className={
                    "col-12 " +
                    (emails[selectedEmail].recentMessages ?? "d-none")
                  }
                >
                  <WishColoredBar
                    message="Recent Messages"
                    bgcolor="light"
                  ></WishColoredBar>
                </div>
                <div className="col-12">
                  {emails[selectedEmail].recentMessages === undefined ? (
                    "No recent messages found"
                  ) : (
                    <WishMessageItem
                      recentMessageView
                      emails={emails[selectedEmail].recentMessages}
                    ></WishMessageItem>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {recentMessageView === undefined
        ? renderNormalView()
        : renderRecentMessageView()}
    </>
  );
}
