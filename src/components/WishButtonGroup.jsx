/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WishButtonGroup({
  title,
  subTitle,
  buttons,
  complexItem,
  onSelect,
  setSelectedButtonIndex,
  noSelection = false,
  className = "",
  selectedIndex,
}) {
  const [selectedButton, setSelectedButton] = useState(selectedIndex);
  const [items, setItems] = useState(buttons);

  useEffect(() => {
    if (selectedButton !== selectedIndex) setSelectedButton(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    if (setSelectedButtonIndex !== undefined) {
      setSelectedButtonIndex.current = setSelectedButtonIndexValue;
    }
  });

  function setSelectedButtonIndexValue(index, buttonsArray) {
    setSelectedButton(index);
    setItems(buttonsArray);
  }

  // const isDisabled = function (index) {
  //   var value = false;

  //   if (disabledButtonIndices !== undefined) {
  //     disabledButtonIndices.map((disabledButtonIndice) => {
  //       console.log(disabledButtonIndice);
  //       value = disabledButtonIndice === index;
  //       //return value;
  //     });
  //   }

  //   return value === true ? " disabled " : "";
  // };

  const renderSimpleButton = function (button, index) {
    return (
      <a
        className={
          "btn " +
          (selectedButton === index && noSelection === false
            ? "btn-primary active "
            : "bg-lightBlue")
          // isDisabled(index)
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
  };

  const renderComplexButton = function (button, index) {
    return (
      <a
        className={
          "btn " +
          (selectedButton === index && noSelection === false
            ? "btn-primary active "
            : "bg-lightBlue ") +
          (button.disabled === true ? " disabled " : "")
        }
        key={index}
        aria-current="page"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedButton(index);
          onSelect && onSelect(index);
        }}
      >
        {button.title}
      </a>
    );
  };

  return (
    <div className={"form-group row " + className}>
      <div className="col-12 text-center">
        <h5 className={title === undefined ? "hidden" : ""}>{title ?? ""}</h5>
        <small className={subTitle === undefined ? "hidden" : ""}>
          <em>{subTitle ?? ""}</em>
        </small>
        <div className="btn-group btn-block" id={uuidv4()}>
          {items.map((button, index) => {
            if (complexItem === undefined) {
              return renderSimpleButton(button, index);
            } else {
              return renderComplexButton(button, index);
            }
          })}
        </div>
      </div>
    </div>
  );
}
