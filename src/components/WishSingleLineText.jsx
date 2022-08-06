import React from "react";

export default function WishSingleLineText({
  label,
  initialValue = "",
  placeholder = "",
  required = false,
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
      <div className="col-8">
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
    </div>
  );
}
