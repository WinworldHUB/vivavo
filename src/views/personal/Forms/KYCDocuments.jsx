/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import JSONData from "../../../data/Data.json";

export default function KYCDocuments({ data = [] }) {
  const [documents, setDocuments] = useState(data);

  useEffect(() => {
    if (documents.length === 0) {
      setDocuments(JSONData.profile.KYCDocuments);
    }
  }, [documents]);

  const calcProperties = function ({ documentStatus = String }) {
    var output = {
      title: "",
      bgColor: "",
      disabled: false,
    };
    switch (documentStatus.toLowerCase()) {
      case "upload":
        output.title = "upload";
        output.bgColor = "doc-bg-notstarted";
        break;

      case "rejected":
        output.title = "re-upload";
        output.bgColor = "doc-bg-rejected";
        break;

      case "uploaded":
        output.title = "uploaded";
        output.bgColor = "doc-bg-awaiting";
        output.disabled = true;
        break;

      default:
        output.title = "view";
        output.bgColor = "doc-bg-approved";
        break;
    }

    return output;
  };

  return (
    <div className="row pl-2">
      {documents.map((document, index) => {
        return (
          <>
            <div className="text-center pb-5" style={{ width: "200px" }}>
              <div
                className={
                  calcProperties({ documentStatus: document.status }).bgColor
                }
                style={{
                  width: "100px",
                  height: "120px",
                  borderRadius: "8px",
                }}
              >
                <p className="text-right" style={{ paddingRight: "7px" }}>
                  <i className={"las " + document.icon}></i>
                </p>
                <p className="lead text-left pl-1 pr-1">{document.title}</p>
                <div
                  className={
                    "shadow white " +
                    (calcProperties({ documentStatus: document.status })
                      .disabled
                      ? " doc-bg-disabled "
                      : "bg-primary clickable ")
                  }
                  style={{
                    width: "150px",
                    height: "40px",
                    position: "relative",
                    borderRadius: "5px",
                    bottom: "0px",
                    left: "-20px",
                    paddingTop: "10px",
                  }}
                >
                  <button
                    className="text-center white text-uppercase"
                    disabled={
                      calcProperties({ documentStatus: document.status })
                        .disabled
                    }
                  >
                    <strong>
                      {
                        calcProperties({ documentStatus: document.status })
                          .title
                      }
                    </strong>
                  </button>
                </div>
                {document.hasTemplate !== undefined &&
                document.hasTemplate === true ? (
                  <span style={{ minHeight: "50px", paddingTop: "100px" }}>
                    Template
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
