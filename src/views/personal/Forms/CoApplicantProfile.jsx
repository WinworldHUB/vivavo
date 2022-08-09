import React from "react";
import data from "../../../data/Data.json";
import WishSelect from "../../../components/WishFormComponents/WishSelect";
import WishSingleLineText from "../../../components/WishFormComponents/WishSingleLineText";
import WishDateControl from "../../../components/WishFormComponents/WishDateControl";
import WishFileControl from "../../../components/WishFormComponents/WishFileControl";
import WishProfilePicture from "../../../components/WishFormComponents/WishProfilePicture";

export default function CoApplicantProfile({ mode }) {
  function RenderReadOnlyForm() {
    return (
      <>
        {data.profile.CoApplicantDetails.map((detail, index) => {
          if (detail.type === "link") {
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
        {data.profile.CoApplicantDetails.map((element, index) => {
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

              case "date":
                return (
                  <WishDateControl
                    key={index}
                    label={element.title}
                    placeholder={element.title}
                  />
                );

              case "file":
                return (
                  <WishFileControl
                    key={index}
                    label={element.title}
                    placeholder={element.title}
                  />
                );

              case "image":
                return (
                  <WishProfilePicture
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
                    verify={element.needsVerification ?? false}
                  />
                );
            }
          }
        })}
      </>
    );
  }

  return (
    <>{mode === "edit" ? <RenderEditableForm /> : <RenderReadOnlyForm />}</>
  );
}
