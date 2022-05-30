/* eslint-disable no-undef */
import { useEffect } from "react";
import WishModal from "./WishModal";

export default function WishInfoDialog({
  infomessage,
  messageIcon,
  show,
  hide,
}) {
  //var timerID;

  const openDialog = () => {
    $("#dlgInternalInfoDialog").modal({
      keyboard: false,
      backdrop: "static",
    });
  };

  const closeDialog = () => {
    $("#dlgInternalInfoDialog").modal("hide");
  };

  const message = function () {
    var msg =
      infomessage === undefined
        ? "Loading ..."
        : "<i className='las la-" +
          (messageIcon ?? "") +
          "'></i>" +
          infomessage;

    return msg;
  };

  useEffect(() => {
    if (show !== undefined) show.current = openDialog;
    if (hide !== undefined) hide.current = closeDialog;
  });

  return (
    <WishModal
      id="dlgInternalInfoDialog"
      infoMode={infomessage ?? "Loading ..."}
    ></WishModal>
  );
}
