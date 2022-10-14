import React from "react";
import { useState } from "react";
import WishMailMessage from "./WishMailMessage";

export default function WishMailList({ messages = [], onMessageClicked }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className="list-group">
      {messages &&
        messages.map((message, index) => {
          return (
            <WishMailMessage
              message={message}
              key={index}
              isSelected={index === selectedIndex}
              onClicked={() => {
                setSelectedIndex(index);
                onMessageClicked && onMessageClicked(index);
              }}
            />
          );
        })}
    </div>
  );
}
