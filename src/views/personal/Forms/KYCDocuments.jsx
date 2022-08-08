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

  const calcBGColor = function ({ documentStatus = String }) {
    switch (documentStatus.toLowerCase()) {
      case "upload":
        return "doc-bg-notstarted";

      case "rejected":
        return "doc-bg-rejected";

      case "uploaded":
        return "doc-bg-awaiting";

      default:
        return "doc-bg-approved";
    }
  };

  return (
    <div className="row pl-2">
      {documents.map((document, index) => {
        return (
          <>
            <div className="text-center pb-5" style={{ width: "200px" }}>
              <div
                className={calcBGColor({ documentStatus: document.status })}
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
                  className="bg-primary shadow white"
                  style={{
                    width: "150px",
                    height: "40px",
                    position: "relative",
                    borderRadius: "5px",
                    bottom: "0px",
                    left: "-20px",
                    paddingTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  <a className="text-center white text-uppercase" href="">
                    <strong>{document.status}</strong>
                  </a>
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
