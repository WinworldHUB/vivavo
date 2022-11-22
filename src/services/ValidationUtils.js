import moment from "moment";

export const ValidationUtils = {
  isEmpty: function (
    value,
    defaultErrorMessage = "Value is required",
    onError
  ) {
    if (value.trim() === "") {
      onError && onError(defaultErrorMessage);
      return false;
    }

    return true;
  },

  isValid: function (value, regEx, defaultErrorMessage, onError) {
    if (!value.match(regEx)) {
      onError && onError(defaultErrorMessage);
      return false;
    }

    return true;
  },

  validateDOB: function (dob, defaultErrorMessage, onError) {
    if (dob.trim() === "") {
      onError && onError(defaultErrorMessage);
      return false;
    }

    var YearsBeforeToday = moment().subtract(18, "years");

    if (moment(dob).isSameOrAfter(YearsBeforeToday)) {
      onError && onError("You must be 18 years or above to enrol");
      return false;
    }

    return true;
  },

  isSame: function (value1, value2, defaultErrorMessage, onError) {
    if (value1 !== value2) {
      onError && onError(defaultErrorMessage);
      return false;
    }
    
    return true;
  }
};
