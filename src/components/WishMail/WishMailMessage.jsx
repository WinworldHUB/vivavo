/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function WishMailMessage({
  message,
  onClicked,
  isSelected = false,
}) {
  return (
    <a
      class={
        "list-group-item list-group-item-action" + (isSelected ? " active " : " ")
      }
      onClick={() => {
        onClicked && onClicked();
      }}
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{message.subject ?? "Message Subject"}</h5>
        <small>{message.timestamp ?? "timelapse"}</small>
      </div>
      <p class="mb-1 collapse-text">{message.message ?? "Message Body"}</p>
      <small>
        {(message.recentMessages && message.recentMessages.length) +
          " more messages" ?? ""}
      </small>
    </a>
  );
}
