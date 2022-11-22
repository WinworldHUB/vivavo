const WishDialog = ({ title, show, size, children, onClose }) => {
  const showModal = {
    display: "block",
    paddingRight: "17px",
    overflow: "auto",
  };
  return (
    <div
      className={`modal fade ${show === true && "show"}`}
      tabIndex="-1"
      role="dialog"
      style={show === true ? { ...showModal } : {}}
    >
      <div
        className={`modal-dialog modal-dialog-centered ${size}`}
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose && onClose(false);
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose && onClose(true);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose && onClose(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishDialog;
