import React from "react";
import data from "../../../data/Data.json";
import WishSelect from "../../../components/WishFormComponents/WishSelect";
import WishSingleLineText from "../../../components/WishFormComponents/WishSingleLineText";
import WishFileControl from "../../../components/WishFormComponents/WishFileControl";

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

  function RenderEditableForm({ details = [] }) {
    return (
      <>
        {details.map((element, index) => {
          switch (element.type.toLowerCase()) {
            case "section":
              return (
                <div className="pb-2">
                  <h5>{element.title}</h5>
                  <RenderEditableForm details={element["editableFields"]} />
                </div>
              );

            case "dropdown":
              return (
                <WishSelect
                  key={index}
                  label={element.title}
                  data={element.options}
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
        })}
      </>
    );
  }

  return (
    <div className="col-md-6">
      {mode === "edit" ? (
        <RenderEditableForm details={data.profile.AddressDetails} />
      ) : (
        <RenderReadOnlyForm />
      )}
    </div>
  );
}
