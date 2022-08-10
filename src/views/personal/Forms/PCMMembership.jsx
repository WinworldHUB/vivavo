/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import WishSimpleCard from "../../../components/WishSimpleCard";
import { v4 as uuidv4 } from "uuid";

export default function PCMMembership() {
  const elementId = uuidv4();
  const [availed, setAvailed] = useState(false);

  return (
    <WishSimpleCard
      header={<h4 class="card-title">PCM Membership</h4>}
      footer={
        availed === false ? (
          <label
            htmlFor={elementId}
            className="card-link text-primary link-dotted clickable ml-auto"
          >
            Avail
          </label>
        ) : (
          <br />
        )
      }
    >
      <input
        type="file"
        name={elementId}
        id={elementId}
        className="hidden"
        onChange={() => {
          setAvailed(true);
        }}
      />
      {availed === false ? (
        <p className="">
          You have not yet availed the PCM benefits. Use the avail button to
          initiate the process
        </p>
      ) : (
        <p className="">
          Your request has been submitted and the application is under review.
          Once approved you can place PCM orders
        </p>
      )}
    </WishSimpleCard>
  );
}
