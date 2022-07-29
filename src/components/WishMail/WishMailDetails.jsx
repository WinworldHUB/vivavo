/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import WishSimpleCard from "../WishSimpleCard";
import WishAttachmentIcon from "./WishAttachmentIcon";
import WishConversationHistoryList from "./WishConversationHistoryList";

export default function WishMailDetails({ message }) {
  const renderAttachments = function () {
    if (message.attachments !== undefined && message.attachments.length > 0) {
      return message.attachments.map((attachment, index) => {
        return <WishAttachmentIcon attachment={attachment} key={index} />;
      });
    } else {
      return <p className="text-danger">No Attachments</p>;
    }
  };
  const renderConversationHistory = function () {
    if (
      message.recentMessages !== undefined &&
      message.recentMessages.length > 0
    ) {
      return (
        <>
          <h3 className="mt-3">Conversation History</h3>
          <WishConversationHistoryList conversations={message.recentMessages} />
        </>
      );
    }
  };
  return (
    <>
      <WishSimpleCard className="border">
        <p>{message && message.message}</p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex justify-content-between align-items-center">
            {message && renderAttachments()}
          </div>
          <a className="d-flex justify-content-between align-items-center text-primary link-dotted">
            <i className="las la-reply"></i>&nbsp;Reply
          </a>
        </div>
      </WishSimpleCard>
      {message && renderConversationHistory()}
    </>
  );
}
