import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const WishSelect = ({ label, data, onSelect, initialValue }) => {
  const elementId = uuidv4();

  const [selectedItem, setSelectedItem] = useState(initialValue ?? data[0]);

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
          // defaultValue={selectedItem}
          // value={selectedItem}
          onChange={(e) => {
            setSelectedItem(e.target.value);
            onSelect && onSelect(e.target.value);
          }}
          value={selectedItem}
        >
          {data &&
            data.map((item, index) => {
              return (
                <option
                  value={item}
                  key={index}
                  //selected={item === selectedItem ? "selected" : ""}
                >
                  {item}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default WishSelect;
