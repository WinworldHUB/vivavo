import React from "react";

export default function WishConversationHistoryList({ conversations }) {
  return (
    <div className="wish-timeline ml-2">
      <ul className="border-left">
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conversation, index) => {
            return (
              <li className="px-2 py-2">
                <i className="las la-envelope-open timeline-icon shadow"></i>
                <h4>{conversation.timestamp}</h4>
                <p className="bg-light p-1">{conversation.message}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
