import React from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import "./timelines.css";

export default function WishRankTimeline({ data }) {
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

    var textColor = "";

    if (item.paidAsRank && item.paidAsRank) {
      textColor = "text-primary";
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
              <small className="rank-subTitle font-italic">
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
