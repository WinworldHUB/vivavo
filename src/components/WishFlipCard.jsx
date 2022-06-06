import { useState } from "react";
import "../assets/css/flipper.css";
import { v4 as uuidv4 } from "uuid";
import WishSimpleCard from "./WishSimpleCard";

export default function WishFlipCard({ children, showBackFooter }) {
  const [flip, setFlip] = useState(false);
  const frontEdit = (
    <div className="row">
      <div className="col-8"><h3>{children.frontHeader}</h3></div>
      <div className="col-4 text-right">
        <i className="las la-edit" onClick={() => setFlip(!flip)}></i>
      </div>
    </div>
  );
  const backEdit = (
    <div className="row align-items-center">
      <div className="col-8"><h3>{children.backHeader}</h3></div>
      <div className="col-4 text-right">
        <button
          className="btn btn-success"
          onClick={() => setFlip(!flip)}
        >
          Update
        </button>
      </div>
    </div>
  );

  const backFooter = (
    <button
      className="btn btn-success ml-auto"
      onClick={() => setFlip(!flip)}
    >
      Update
    </button>
  );

  return (
    <div className="flipper ">
      <div
        className={"flipper-card " + (flip === true ? "flipper-is-flipped" : "")}
      >
        <WishSimpleCard
          background={"flipper-front " + (flip === true ? "hidden" : "")}
          header={frontEdit}
          body={children.front}
        ></WishSimpleCard>
        {/* <div className={"flipper-front " + (flip === true ? "hidden" : "")}>
          {children.front}
        </div> */}
        {/* <div className="flipper-back ">{children.back}</div> */}
        <WishSimpleCard
          background={"flipper-back " + (flip === false ? "hidden" : "")}
          header={backEdit}
          body={children.back}
          footer={showBackFooter && backFooter}
        ></WishSimpleCard>
      </div>
    </div>
  );
}
