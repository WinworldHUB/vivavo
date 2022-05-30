import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function WishModal({
  id,
  title,
  body,
  finishTitle,
  onFinish,
  onCancel,
  noFooter,
  modalSize,
  children,
  infoMode,
}) {
  const dialogTitle = function (title) {
    if (infoMode !== undefined) {
      return "";
    } else {
      return title ?? "Dialog Title";
    }
  };
  return (
    <div
      className="modal fade text-left"
      id={id ?? uuidv4()}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="basicModalLabel3"
      aria-hidden="true"
    >
      <div
        className={
          "modal-dialog modal-dialog-centered " + (modalSize ?? modalSize)
        }
        role="document"
      >
        <div className="modal-content">
          <div
            className={"modal-header " + (dialogTitle() === "" ? "hidden" : "")}
          >
            <h4 className="modal-title" id="basicModalLabel3">
              {dialogTitle()}
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e) => onCancel && onCancel(e)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">{infoMode ?? children}</div>
          <div
            className={"modal-footer " + ((noFooter || infoMode) && "d-none")}
          >
            <button
              type="button"
              className="btn grey btn-secondary"
              data-dismiss="modal"
              onClick={(e) => onCancel && onCancel(e)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={(e) => onFinish && onFinish(e)}
            >
              {finishTitle ?? "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}