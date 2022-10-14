/* eslint-disable no-undef */
export const AppUtils = {
  showDialog: function (dialogId) {
    $("#" + dialogId).modal("show");
  },

  hideDialog: function (dialogId) {
    $("#" + dialogId).modal("hide");
  },

  getFormData: function (formId) {
    var formEl = document.getElementById(formId);

    if (formEl) {
      return new FormData(formEl);
    }

    return null;
  }
};