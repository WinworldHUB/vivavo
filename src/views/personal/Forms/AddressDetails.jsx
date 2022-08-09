import React from "react";
import WishMultilineText from "../../../components/WishFormComponents/WishMultilineText";
import data from "../../../data/Data.json";

export default function AddressDetails({ mode }) {
  function RenderReadOnlyForm() {
    return (
      <>
        {data.profile.AddressDetails.map((detail, index) => {
          return (
            <>
              <p key={index}>
                <strong>{detail.title}</strong>:
              </p>
              <p>{detail.value}</p>
            </>
          );
        })}
      </>
    );
  }

  function RenderEditableForm() {
    return (
      <>
        {data.profile.AddressDetails.map((element, index) => {
          if (element.editable) {
            return (
              <WishMultilineText
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
    <div className="col-md-6">
      {mode === "edit" ? <RenderEditableForm /> : <RenderReadOnlyForm />}
    </div>
  );
}
