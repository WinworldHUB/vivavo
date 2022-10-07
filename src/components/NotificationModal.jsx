import ReactDOM from "react-dom";

const NotificationModal = ({ isShowing, message = "Processing ..." }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal" tabindex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <p>{message}</p>
                </div>
              </div>
            </div>
          </div>
        </>, document.body
      )
    : null;

export default NotificationModal;