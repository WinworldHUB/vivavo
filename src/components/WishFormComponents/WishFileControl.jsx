import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import WishFlexBox from "../WishFlexBox";

const WishFileControl = ({
  label,
  initialValue = "",
  placeholder = "",
  required = false,
  verify = false,
  onVerifyClicked,
  readonly = false,
  onChange,
  id,
  filter,
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

    if (filter) {
      opts["accept"] = filter
    }

    return opts;
  };

  const RenderFilePreview = () => {
    return (
      <WishFlexBox>
        <a href={elValue} target="_blank" rel="noreferrer">
          {elValue}
        </a>
        <button
          className="text-danger"
          onClick={() => {
            setElValue(null);
          }}
        >
          <WishFlexBox>
            <i className="las la-trash-alt"></i>&nbsp;Remove
          </WishFlexBox>
        </button>
      </WishFlexBox>
    );
  };

  const RenderFileInput = () => {
    return (
      <input
        id={elementId}
        name={elementId}
        placeholder={placeholder ?? label}
        type="file"
        className="form-control"
        //defaultValue={elValue}
        //value={elValue}
        onChange={(e) => {
          setElValue(e.target.value);
          onChange && onChange(e.target.value, e.target.files[0]);
        }}
        {...additionalAttributes()}
        //ref={customRef}
      />
    );
  };

  return (
    <div className="form-group row">
      <label htmlFor={elementId} className="col-4 col-form-label">
        {label}
      </label>
      <div className={verify === false ? "col-8" : "col-5"}>
        {elValue ? <RenderFilePreview /> : <RenderFileInput />}
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

export default WishFileControl;
