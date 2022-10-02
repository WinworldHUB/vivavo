import { useEffect } from "react";
import _ from "lodash";
import useAPI from "./useAPI";
import { useState } from "react";

export const authenticationModel = {
  user_name: Number,
  user_type: (Number, 1),
  password: String,
  device_id: (String, ""),
  device_info: (String, ""),
  device_token: (String, ""),
  mplatform_id: (Number, 1),
  location: (String, ""),
  isReadyToAuthenticate: (Boolean, false),
};

export const changePasswordModel = {
  user_name: (Number, -1),
  user_type: (Number, -1),
};

const useAuthentication = () => {
  const [response, error, { postData, getData }] = useAPI();

  const login = (credentials = authenticationModel) => {
    const userCredentials = _.cloneDeep(authenticationModel);
    userCredentials.user_name = credentials.user_name;
    userCredentials.password = credentials.password;
    userCredentials.isReadyToAuthenticate = credentials.isReadyToAuthenticate;
    postData("/enrollment/login", userCredentials);
  };

  const changePassword = (changePasswordDetails = changePasswordModel) => {
    postData("/enrollment/forgot-user-password", changePasswordDetails);
  };

  return [response, error, { login, changePassword }];
};

export default useAuthentication;
