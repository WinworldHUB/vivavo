import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const WishSingleLineText = ({
  label,
  initialValue = "",
  placeholder,
  required = false,
  verify = false,
  onVerifyClicked,
  readonly = false,
  onChange,
  onBlurred,
  passwordField = false,
  id,
  icon,
}) => {
  const elementId = id ? id : label ? label?.replace(" ", "") : uuidv4();
  const [elValue, setElValue] = useState(initialValue ?? label);

  useEffect(() => {
    setElValue(initialValue ?? label);
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

    if (icon) {
      outputClass += "form-group position-relative has-icon-left ";
    }

    if (label) {
      if (verify === false) {
        outputClass += " col-8 ";
      } else {
        outputClass += " col-5 ";
      }
    } else {
      outputClass += " col-12 ";
    }

    return outputClass;
  };

  return (
    <div className="form-group row">
      {label && (
        <label htmlFor={elementId} className="col-4 col-form-label">
          {label}
        </label>
      )}
      <div className={generateClassForInput()}>
        <input
          id={elementId}
          name={elementId}
          placeholder={placeholder ?? label}
          type={passwordField ? "password" : "text"}
          className="form-control"
          //defaultValue={elValue}
          value={elValue}
          onChange={(e) => {
            setElValue(e.target.value);
            onChange && onChange(e.target.value);
          }}
          onBlur={() => onBlurred && onBlurred(elValue)}
          {...additionalAttributes()}
          //ref={customRef}
        />
        {icon && (
          <div className="form-control-position pl-1 ">
            <i className={icon}></i>
          </div>
        )}
      </div>
      {verify === true ? (
        <div className="col-3">
          <button
            className="btn btn-primary btn-block"
            onClick={(e) => {
              onVerifyClicked && onVerifyClicked(e);
            }}
          >
            Verify
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WishSingleLineText;
