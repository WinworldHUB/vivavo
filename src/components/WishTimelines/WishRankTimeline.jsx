/* eslint-disable no-undef */
import React from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import "./timelines.css";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

export default function WishRankTimeline({ data }) {
  useEffect(() => {
    var some = document.querySelectorAll('[data-scrollTo="true"]')[0];
    if (some !== undefined || some !== null) {
      some.scrollIntoView({ behavior: "smooth" });
    }
  });

  const renderDateComponent = function (imgPath) {
    return (
      <div className="text-right pr-2">
        <img src={imgPath} alt="Rank" className="rank-image"></img>
      </div>
    );
  };

  const renderTitle = function (item) {
    if (item.selected !== undefined && item.selected === true) {
      return (
        <h3>
          <code className="rank-title">{item.title}</code>
        </h3>
      );
    }

    var textColor = "text-light";

    if (item.paidAsRank && item.paidAsRank) {
      textColor = "text-primary";
    } else if (item.completed !== undefined && item.completed === true) {
      textColor = "text-muted";
    }

    return <h3 className={"rank-title " + textColor}>{item.title}</h3>;
  };

  const renderColor = function (item) {
    var color = "var(--light)";

    if (item.paidAsRank && item.paidAsRank) {
      color = "var(--primary)";
    } else if (item.completed && item.completed) {
      color = "var(--success)";
    } else if (item.selected && item.selected) {
      color = "var(--danger)";
    }

    return color;
  };

  return (
    <Timeline lineColor="#efefef">
      {data &&
        data.map((item, index) => {
          return (
            <TimelineItem
              key={index}
              dateComponent={renderDateComponent(item.rankImage)}
              style={{
                color: renderColor(item),
              }}
            >
              {renderTitle(item)}
              <small
                className="rank-subTitle font-italic"
                id={uuidv4()}
                data-scrollTo={item.selected ? true : false}
              >
                {item.subTitle && item.subTitle}
              </small>
              <hr />
              <p className="text-justify">
                {item.description && item.description}
              </p>
            </TimelineItem>
          );
        })}
    </Timeline>
  );
}
