import React from "react";
import "./cpb.css";

export default function WishCPB({ value = 60 }) {
  return (
    <div class="circle-wrap">
      <div class="circle">
        <div class="mask full">
          <div class="fill"></div>
        </div>
        <div class="mask half">
          <div class="fill"></div>
        </div>
        <div class="inside-circle"> {value}% </div>
      </div>
    </div>
  );
}
