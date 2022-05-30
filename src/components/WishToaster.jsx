/* eslint-disable no-undef */
const DisplayPositions = {
  leftTop: "toast-top-left",
  rightTop: "toast-top-right",
  leftBottom: "toast-bottom-left",
  rightBottom: "toast-bottom-right",
  topFull: "toast-top-full-width",
  bottomFull: "toast-bottom-full-width",
  topCenter: "toast-top-center",
  bottomCenter: "toast-bottom-center",
};

const ToastTypes = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export default function WishToaster({
  toastTitle,
  toastMessage,
  toastPosition,
  toastType,
  closeButton,
  show,
}) {
  const showToast = function () {
    var objToast = toastr[toastType ?? "error"](
      toastMessage ?? "",
      toastTitle ?? ""
    );

    toastr.options = {
      closeButton: closeButton ?? false,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: toastPosition ?? DisplayPositions.rightTop,
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    return objToast;
  };

  //   useEffect(() => {
  //     if (show !== undefined) {
  //       show.current = showToast;
  //     }
  //   });

  return showToast();
}
