import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function WishListGroup({
  title,
  subTitle,
  items,
  onSelect,
  selectedItemIndex,
}) {
  const [selectedItem, setSelectedItem] = useState(selectedItemIndex ?? null);

  return (
    <div>
      <h5 className={title === undefined ? "hidden" : ""}>{title ?? ""}</h5>
      <small className={subTitle === undefined ? "hidden" : ""}>
        <em>{subTitle ?? ""}</em>
      </small>
      <div className="list-group file-list" id={uuidv4()}>
        {items.map((item, index) => {
          return (
            <a
              className={
                "list-group-item list-group-item-action " +
                (selectedItem === index ? "active" : "")
              }
              aria-current="true"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(index);
                onSelect && onSelect(index);
              }}
            >
              {item}
            </a>
          );
        })}
      </div>
    </div>
  );
}
