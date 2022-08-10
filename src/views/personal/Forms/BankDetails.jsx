import React from "react";
import data from "../../../data/Data.json";
import WishSingleLineText from "../../../components/WishFormComponents/WishSingleLineText";
import WishFileControl from "../../../components/WishFormComponents/WishFileControl";

export default function BankDetails({ mode }) {
  function RenderReadOnlyForm() {
    return (
      <>
        {data.profile.BankDetails.map((detail, index) => {
          if (detail.type === "link" || detail.type === "file") {
            return (
              <p key={index}>
                {detail.title}:{" "}
                <a href={detail.value} target="_blank" rel="noreferrer">
                  <strong>{detail.value}</strong>
                </a>
              </p>
            );
          }

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
            switch (element.type) {
              case "file":
                return (
                  <WishFileControl
                    key={index}
                    label={element.title}
                    placeholder={element.title}
                  />
                );

              default:
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
