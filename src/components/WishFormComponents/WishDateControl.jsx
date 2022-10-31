import React from "react";

export default function WishDateControl({
  label,
  initialValue = "",
  placeholder = "",
  required = false,
  onChange,
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
          type="date"
          id={elementId}
          className="form-control"
          name={elementId}
          placeholder={placeholder}
          data-toggle="tooltip"
          data-trigger="hover"
          data-placement="top"
          data-title="Date of birth"
          defaultValue={initialValue}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
          {...additionalAttributes()}
        />
      </div>
    </div>
  );
}
