/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import WishSimpleCard from "./WishSimpleCard";

const highlightColor = (cardState) => {
  switch (cardState) {
    case "approved":
      return "text-success";

    case "rejected":
      return "text-danger";

    default:
      return "";
  }
};

const cardTitle = (cardState, documentTitle) => {
  switch (cardState) {
    case "notsubmitted":
      return "Upload " + (documentTitle ?? "document");

    case "approved":
      return (documentTitle ?? "document") + " approved";

    case "rejected":
      return (documentTitle ?? "document") + " rejected";

    case "preview":
      return documentTitle ?? "document";

    default:
      return (documentTitle ?? "document") + " submitted";
  }
};

const cardIcon = (cardState) => {
  switch (cardState) {
    case "notsubmitted":
      return "la-upload";

    case "approved":
      return "la-eye";

    case "rejected":
      return "la-info-circle";

    case "preview":
      return "la-eye";

    default:
      return "la-eye";
  }
};

const cardMessage = (cardState, documentTitle) => {
  switch (cardState) {
    case "notsubmitted":
      return "Please upload " + documentTitle;

    case "approved":
      return documentTitle + " approved";

    case "rejected":
      return documentTitle + " rejected";

    case "preview":
      return "View " + documentTitle;

    default:
      return documentTitle + " submitted, awaiting response";
  }
};

const cardActionTitle = (cardState) => {
  switch (cardState) {
    case "notsubmitted":
      return "UPLOAD";

    case "rejected":
      return "RE-UPLOAD";

    case "preview":
      return "PREVIEW";

    default:
      return "VIEW";
  }
};

function Header(props) {
  const cardState = props.status ?? "notsubmitted";

  return (
    <div className="row">
      <div className="col-12">
        <h5>{cardTitle(cardState, props.title)}</h5>
      </div>
    </div>
  );
}

function Body(props) {
  const cardState = props.status ?? "notsubmitted";

  return (
    <>
      <p className={" " + highlightColor(cardState)}>
        {props.message === undefined ? (
          cardMessage(cardState, props.title ?? "Document")
        ) : (
          <>Reason: {props.message}</>
        )}
        {/* {cardMessage(cardState, props.title ?? "Document")} */}
      </p>
      {/* {props.message && <p>Reason: {props.message}</p>} */}
    </>
  );
}

function Footer(props) {
  const cardState = props.status ?? "notsubmitted";

  return (
    <>
      {props.content ?? (
        <a
          className="card-link d-flex align-items-center"
          onClick={() => {
            props.onActionClick && props.onActionClick();
          }}
        >
          {cardActionTitle(cardState)}&nbsp;
          <i
            className={"las " + (cardIcon(cardState) ?? "la-history")}
            title={cardTitle(cardState)}
          ></i>
        </a>
      )}
    </>
  );
}

export default function DocumentCard(props) {
  return (
    <WishSimpleCard
      header={Header(props)}
      body={Body(props)}
      footer={Footer(props)}
    ></WishSimpleCard>
  );
}
