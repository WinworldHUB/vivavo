import React from "react";
import data from "../../../data/Data.json";
import WishSingleLineText from "../../../components/WishFormComponents/WishSingleLineText";

export default function DistributorDetails() {
  function RenderEditableForm() {
    return (
      <>
        {data.profile.DistributorDetails.map((element, index) => {
          if (element.editable) {
            switch (element.type) {
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
          return "";
        })}
      </>
    );
  }

  return <RenderEditableForm />;
}
