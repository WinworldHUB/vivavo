import React from "react";
import data from "../../../data/Data.json";
import WishSimpleTimeline from "../../../components/WishTimelines/WishSimpleTimeline";

export default function RankJourney() {
  return (
    <>
      <div className="col-md-9 file-list">
        <WishSimpleTimeline items={data.profile.RankJourney} />
      </div>
      <div className="col-md-3 bg-white text-center">
        <img
          className="w-50 pb-4"
          src="../assets/app-assets/images/badges/idealDistributor.jpg"
          alt="Ideal Distributor"
        />
        <br />
        <img
          className="w-75 pb-2"
          src="../assets/app-assets/images/badges/presidentialclub.jpg"
          alt="Ideal Distributor"
        />
      </div>
    </>
  );
}
