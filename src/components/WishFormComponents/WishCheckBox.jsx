import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WishFlexBox from "../WishFlexBox";

const WishCheckBox = ({
  label,
  initialValue,
  required = false,
  readonly = false,
  onChange,
  id,
}) => {
  const elementId = id ? id : label ? label?.replace(" ", "") : uuidv4();
  const [elValue, setElValue] = useState(initialValue);

  useEffect(() => {
    setElValue(initialValue);
  }, [initialValue]);

  const additionalAttributes = function () {
    var opts = {};
    if (required) {
      opts["required"] = "required";
    }

    if (readonly) {
      opts["readOnly"] = "readOnly";
    }

    return opts;
  };

  return (
    <WishFlexBox>
      <input
        id={elementId}
        name={elementId}
        type="checkbox"
        checked={elValue}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setElValue(!elValue);
          onChange && onChange(e.target.checked);
        }}
        {...additionalAttributes()}
      />
      &nbsp;
      {label && (
        <label htmlFor={elementId} className="col-form-label text-justify ">
          {label}
        </label>
      )}
    </WishFlexBox>
  );
};

export default WishCheckBox;
