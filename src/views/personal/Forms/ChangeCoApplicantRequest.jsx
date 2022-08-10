import React from "react";
import data from "../../../data/Data.json";
import WishSelect from "../../../components/WishFormComponents/WishSelect";
import WishSingleLineText from "../../../components/WishFormComponents/WishSingleLineText";
import WishDateControl from "../../../components/WishFormComponents/WishDateControl";
import WishFileControl from "../../../components/WishFormComponents/WishFileControl";
import WishProfilePicture from "../../../components/WishFormComponents/WishProfilePicture";

export default function ChangeCoApplicantRequest({
  isCoApplicantMother = true,
}) {
  function RenderEditableForm({ details = [] }) {
    return (
      <>
        {details.map((element, index) => {
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
    <div className="row-fluid">
      <div className="col-12">
        {isCoApplicantMother === true ? (
          <RenderEditableForm
            details={data.profile.CoApplicantChangeToMother}
          />
        ) : (
          <RenderEditableForm details={data.profile.CoApplicantChangeToOther} />
        )}
      </div>
    </div>
  );
}
