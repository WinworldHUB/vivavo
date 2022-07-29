import React from "react";

export default function WishAttachmentIcon({ attachment }) {
  return (
    <a
      className="text-center text-primary"
      target="_blank"
      href={attachment.url}
      rel="noreferrer"
    >
      <div>{attachment && <i className="las la-file la-2x"></i>}</div>
      <div>{attachment && attachment.name}&nbsp;&nbsp;&nbsp;</div>
    </a>
  );
}
