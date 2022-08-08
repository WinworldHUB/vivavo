/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import data from "../../../data/Data.json";
import WishSelect from "../../../components/WishSelect";
import WishSingleLineText from "../../../components/WishSingleLineText";

export default function PersonalDetails({ mode }) {
  function RenderReadOnlyForm() {
    return (
      <>
        {data.profile.PersonalDetails.map((detail, index) => {
          if (detail.type === "link") {
            return (
              <p key={index}>
                {detail.title}:{" "}
                <a href={detail.value} target="_blank">
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
        {data.profile.PersonalDetails.map((element, index) => {
          if (element.editable) {
            switch (element.type) {
              case "dropdown":
                return (
                  <WishSelect
                    key={index}
                    label={element.title}
                    data={element.options}
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
