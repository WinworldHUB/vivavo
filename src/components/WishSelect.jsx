import React from "react";
import { useState } from "react";

export default function WishSelect({ data, onSelect }) {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <select
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
  );
}
