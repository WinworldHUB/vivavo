import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WishFlexBox from "../WishFlexBox";

const WishCheckBox = ({
  label,
  initialValue = false,
  required = false,
  readonly = false,
  onChange,
  id,
}) => {
  const elementId = id ? id : label ? label?.replace(" ", "") : uuidv4();
  const [elValue, setElValue] = useState(initialValue ?? false);

  useEffect(() => {
    setElValue(initialValue ?? false);
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

  const generateClassForInput = () => {
    let outputClass = "";

    if (label) {
      outputClass += " col-8 ";
    } else {
      outputClass += " col-12 ";
    }

    return outputClass;
  };

  return (
    <WishFlexBox>
      <input
        id={elementId}
        name={elementId}
        type="checkbox"
        //className="form-control"
        //defaultValue={elValue}
        checked={elValue}
        onChange={(e) => {
          setElValue(e.target.checked);
          onChange && onChange(e.target.checked);
        }}
        {...additionalAttributes()}
        //ref={customRef}
      />&nbsp;
      {label && (
        <label htmlFor={elementId} className="col-form-label">
          {label}
        </label>
      )}
    </WishFlexBox>
  );
};

export default WishCheckBox;
