/* eslint-disable no-undef */
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WishForm({ id, children, onSubmitClicked, validate }) {
  const formId = id ?? uuidv4();
  const runFormValidation = function () {
    var validationErrorsFound = false;

    var form = $("#" + formId);
    if (form !== null) {
      var requiredFields = Array.from($(form).find("input"));

      if (requiredFields.length > 0) {
        requiredFields.forEach((requiredField) => {
          $(requiredField).val($(requiredField).val().trim());
          var fieldValue = $(requiredField).val().trim();

          if (fieldValue === "") {
            $(requiredField)
              .parent()
              .find(".invalid-feedback")
              .removeClass("invalid-feedback");
            validationErrorsFound = true;
          } else {
            $(requiredField)
              .parent()
              .find(".text-danger")
              .addClass("invalid-feedback");
          }
        });
      }
    } else {
      console.log("Form not found");
    }

    return validationErrorsFound;
  };

  useState(() => {
    if (validate !== undefined) {
      validate.current = runFormValidation;
    }
  }, [validate]);

  return (
    <form
      id={formId}
      className="needs-validation"
      noValidate
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onSubmitClicked && onSubmitClicked();
      }}
    >
      {children}
    </form>
  );
}
