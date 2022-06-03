import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function WishListGroup({
  title,
  subTitle,
  action,
  onActionClick,
  items,
  onSelect,
  selectedItemIndex,
}) {
  const [selectedItem, setSelectedItem] = useState(selectedItemIndex ?? null);

  return (
    <div>
      <div className="row align-items-center">
        <div className="col-7">
          <h5 className={title === undefined ? "hidden" : ""}>{title ?? ""}</h5>
          <small className={subTitle === undefined ? "hidden" : ""}>
            <em>{subTitle ?? ""}</em>
          </small>
        </div>
        <div className="col-5 text-right pb-1">
          <button
            className={
              "btn btn-primary " + (action === undefined ? "hidden" : "")
            }
            onClick={(e) => {
              e.stopPropagation();
              onActionClick && onActionClick();
            }}
          >
            {action ?? ""}
          </button>
        </div>
      </div>
      {/* <div
        className={
          "col-12 pt-1 " +
          (title === undefined && action === undefined ? "hidden" : "")
        }
      >
        &nbsp;
      </div> */}
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
