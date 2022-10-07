import _ from "lodash";
import { useState } from "react";
import APIUtils from "./APIUtils";
import { BASE_URL } from "./Constants";

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
  //const [response, error, { postData}] = useAPI();
  //const authenticationAPIs = APIUtils.create();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const login = (credentials = authenticationModel) => {
    const userCredentials = _.cloneDeep(authenticationModel);
    userCredentials.user_name = credentials.user_name;
    userCredentials.password = credentials.password;
    userCredentials.isReadyToAuthenticate = credentials.isReadyToAuthenticate;

    APIUtils.postData(
      "/enrollment/login",
      userCredentials,
      setResponse,
      setError
    );
  };

  const changePassword = (changePasswordDetails = changePasswordModel) => {
    APIUtils.postData(
      "/enrollment/forgot-user-password",
      changePasswordDetails,
      setResponse,
      setError
    );
  };

  const logout = (credentials = authenticationModel) => {
    const userCredentials = _.cloneDeep(authenticationModel);
    userCredentials.user_name = credentials.user_name;
    userCredentials.isReadyToAuthenticate = credentials.isReadyToAuthenticate;
    APIUtils.postData(
      "/enrollment/logout",
      userCredentials,
      setResponse,
      setError
    );
  };

  return [response, error, { login, changePassword, logout }];
};

export default useAuthentication;
