/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WishButtonGroup({
  title,
  subTitle,
  buttons,
  selectedButtonIndex,
  onSelect,
  disabledButtonIndices,
}) {
  const [selectedButton, setSelectedButton] = useState(
    selectedButtonIndex ?? null
  );

  const isDisabled = function (index) {
    var value = false;

    disabledButtonIndices.map((disabledButtonIndice) => {
      value = disabledButtonIndice === index;
    });

    return value;
  };

  return (
    <div className="form-group row">
      <div className="col-12 text-center">
        <h5 className={title === undefined ? "hidden" : ""}>{title ?? ""}</h5>
        <small className={subTitle === undefined ? "hidden" : ""}>
          <em>{subTitle ?? ""}</em>
        </small>
        <div className="btn-group btn-block" id={uuidv4()}>
          {buttons.map((button, index) => {
            return (
              <a
                className={
                  "btn " +
                  (selectedButton === index
                    ? "btn-primary active "
                    : "btn-light ") +
                  (isDisabled(index) === true ? " hidden" : " ")
                }
                key={index}
                aria-current="page"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedButton(index);
                  onSelect && onSelect(index);
                }}
              >
                {button}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
