/* eslint-disable no-undef */
export const AppUtils = {
  showDialog: function (dialogId) {
    $("#" + dialogId).modal("show");
  },

  hideDialog: function (dialogId) {
    $("#" + dialogId).modal("hide");
  },
};
