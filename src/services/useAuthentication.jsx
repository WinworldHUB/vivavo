import { useEffect } from "react";
import _ from "lodash";
import useAPI from "./useAPI";
import { useState } from "react";

export const authenticationModel = {
  user_name: (String, ""),
  password: (String, ""),
  isReadyToAuthenticate: (Boolean, false),
};

export const changePasswordModel = {
  user_name: (Number, -1),
  user_type: (Number, -1),
};

const useAuthentication = () => {

  const [response, {postData, getData, error }] = useAPI();

  const login = (credentials = authenticationModel) => {
    postData("/enrollment/login", credentials);
  };

  const changePassword = (changePasswordDetails = changePasswordModel) => {
    postData("/enrollment/forgot-user-password", changePasswordDetails);
  };

  return [response, error, { login, changePassword }];
};

export default useAuthentication;
