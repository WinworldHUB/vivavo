import React from "react";

export default function WishFileControl({
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
          type="file"
          id={elementId}
          className="form-control"
          name={elementId}
          placeholder={placeholder}
          value={initialValue}
          {...additionalAttributes()}
        />
      </div>
    </div>
  );
}
