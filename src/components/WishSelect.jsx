import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WishSelect({ label, data, onSelect }) {
  const elementId = uuidv4();

  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <div className="form-group row d-flex align-items-center">
      <div className={"" + (label !== undefined ? " col-4 " : " hidden ")}>
        <label htmlFor={elementId}>{label}</label>
      </div>
      <div className={"" + (label !== undefined ? " col-8 " : " col-12 ")}>
        <select
          id={elementId}
          name={elementId}
          className="form-control"
          defaultValue={selectedItem}
          onChange={(e) => {
            setSelectedItem(e.target.value);
            onSelect && onSelect(selectedItem);
          }}
        >
          {data &&
            data.map((item, index) => {
              return <option value={index}>{item}</option>;
            })}
        </select>
      </div>
    </div>
  );
}
