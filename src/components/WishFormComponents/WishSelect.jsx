import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WishSelect({
  label,
  data,
  onSelect,
  initialValue = 0,
}) {
  const elementId = uuidv4();

  const [selectedItem, setSelectedItem] = useState(initialValue);

  useEffect(() => {
    setSelectedItem(initialValue);
  }, [initialValue]);

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
            onSelect && onSelect(e.target.value);
          }}
        >
          {data &&
            data.map((item, index) => {
              return (
                <option value={index} key={index}>
                  {item}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
}
