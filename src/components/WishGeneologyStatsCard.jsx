import React from "react";
import WishSimpleCard from "./WishSimpleCard";

export default function WishGeneologyStatsCard({
  statsCurrentWeek,
  statsPreviousWeek,
  title,
  renderWithoutCard,
}) {
  const currentWeekItemCount = function () {
    return statsCurrentWeek === undefined ? 0 : statsCurrentWeek.length;
  };

  const previousWeekItemCount = function () {
    return statsPreviousWeek === undefined ? 0 : statsPreviousWeek.length;
  };

  const renderBody = function () {
    return (
      <div className="row">
        <div className="col-6 pb-2 text-primary font-italic">Current Week</div>
        <div className="col-6 text-right pb-2 text-primary font-italic">
          Previous Week
        </div>
        <div className="col-6 border-right">
          <div className="row no-gutters">
            {statsCurrentWeek &&
              statsCurrentWeek.map((currentWeekStats, index) => {
                return (
                  <div
                    className={
                      "text-center " +
                      (currentWeekItemCount() > 1 ? "col-6" : "col-12")
                    }
                  >
                    <small>{currentWeekStats.key}</small>
                    <p className="lead">{currentWeekStats.value}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-6">
          <div className="row">
            {statsPreviousWeek &&
              statsPreviousWeek.map((previousWeekStats, index) => {
                return (
                  <div
                    className={
                      "text-center " +
                      (previousWeekItemCount() > 1 ? "col-6" : "col-12")
                    }
                  >
                    <small>{previousWeekStats.key}</small>
                    <p className="lead">{previousWeekStats.value}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="col-12 text-center pt-2">
          <h5 className="text-primary pointer-cursor">{title ?? ""}</h5>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderWithoutCard === undefined ? (
        <WishSimpleCard body={renderBody()}></WishSimpleCard>
      ) : (
        renderBody()
      )}
    </>
  );
}
