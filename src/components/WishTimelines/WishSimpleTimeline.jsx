import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function WishSimpleTimeline({ items }) {
  return (
    <div className="wish-timeline ml-2">
      <ul className="border-left">
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            return (
              <li
                className="px-2 py-2"
                style={{ minHeight: item.spacingBelow ?? "0" }}
              >
                <i
                  className={
                    "las simple-timeline-icon text-muted " +
                    (item.active ? " active shadow " : "") +
                    (item.first ? " first " : "")
                    // item.icon +
                    // " " +
                    // (item.hasShadow ? " shadow " : " ") +
                    // (item.bgColor ?? "")
                  }
                ></i>
                <h4 className={item.active ? " text-primary " : ""}>
                  {item.title}
                </h4>
                {item.subTitle && (
                  <small>
                    <em>{item.subTitle}</em>
                  </small>
                )}
                {item.description && (
                  <p className="bg-light p-1">{item.description}</p>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
