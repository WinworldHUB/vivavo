import React from "react";

export default function WishSingleLineText({
  label,
  initialValue = "",
  placeholder = "",
  required = false,
  verify = false,
  onVerifyClicked,
}) {
  const elementId = "txt" + label.replace(" ", "");

  const additionalAttributes = function () {
    var opts = {};
    if (required) {
      opts["required"] = "required";
    }

    return opts;
  };

  return (
    <div className="form-group row">
      <label htmlFor={elementId} className="col-4 col-form-label">
        {label}
      </label>
      <div className={verify === false ? "col-8" : "col-5"}>
        <input
          id={elementId}
          name={elementId}
          placeholder={placeholder}
          type="text"
          className="form-control"
          value={initialValue}
          {...additionalAttributes()}
        />
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
}
