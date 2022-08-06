import React from "react";
import data from "../../../data/Data.json";
import WishSingleLineText from "../../../components/WishSingleLineText";

export default function BankDetails({ mode }) {
  function RenderReadOnlyForm() {
    return (
      <>
        {data.profile.BankDetails.map((detail, index) => {
          return (
            <p key={index}>
              {detail.title}: <strong>{detail.value}</strong>
            </p>
          );
        })}
      </>
    );
  }

  function RenderEditableForm() {
    return (
      <>
        {data.profile.BankDetails.map((element, index) => {
          if (element.editable) {
            return (
              <WishSingleLineText
                key={index}
                label={element.title}
                placeholder={element.title}
                initialValue={element.value}
                required={true}
              />
            );
          }
        })}
      </>
    );
  }

  return (
    <>{mode === "edit" ? <RenderEditableForm /> : <RenderReadOnlyForm />}</>
  );
}
