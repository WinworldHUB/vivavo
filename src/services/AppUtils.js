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
  },

  getFormDataWithFormObject: function (form) {
    //var formEl = document.getElementById(formId);

    if (form) {
      return new FormData(form);
    }

    return null;
  },

  createFormData: function (object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  },

  getValueFromArray: function (valueArray, matchField, matchValue, value) {
    return valueArray.filter((x) => x[matchField] === matchValue)[0][value];
  },
};
