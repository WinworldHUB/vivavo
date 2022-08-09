import React from "react";

export default function VOTMMembership({ data = [] }) {
  return (
    <div className="row">
      {data.map((document, index) => {
        return (
          <>
            <div className="col-4 pb-2" key={index + "-left"}>
              <h3>
                <i className="las la-file la-3x"></i>
              </h3>
              <a
                href={document.url}
                target="_blank"
                rel="noreferrer"
                className="link-dotted"
              >
                {document.title}
              </a>
            </div>
            <div className="col-8 text-right pb-2" key={index + "-right"}>
              <p>Date: {document.date}</p>
              <p>Status: {document.status}</p>
            </div>
          </>
        );
      })}
    </div>
  );
}
