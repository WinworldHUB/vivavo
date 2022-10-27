import _ from "lodash";
import { useEffect } from "react";
import { useState } from "react";
//import APIUtils from "./APIUtils";
//import { BASE_URL } from "./Constants";
import useAPIs from "./useAPIs";

export const authenticationModel = {
  user_name: Number,
  user_type: (Number, 1),
  password: String,
  device_id: (String, ""),
  device_info: (String, ""),
  device_token: (String, ""),
  mplatform_id: (Number, 1),
  location: (String, ""),
};

export const forgotPasswordModel = {
  user_name: (Number, -1),
  user_type: (Number, -1),
};

const useAuthentication = () => {
  //const [response, error, { postData}] = useAPI();
  //const authenticationAPIs = APIUtils.create();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);
  const { apiError, processing, postData } = useAPIs();

  useEffect(() => {
    if (response) {
      //setLoading(false);
    }
  }, [response]);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  const login = (credentials = {}, onSuccess) => {
    const userCredentials = _.cloneDeep(authenticationModel);
    userCredentials.user_name = credentials.user_name;
    userCredentials.password = credentials.password;

    //setLoading(true);
    postData(
      "/enrollment/login",
      userCredentials,
      (data) => {
        setResponse(data);
        onSuccess(data);
      }
      //setError
    );
  };

  const forgotPassword = (changePasswordDetails, onSuccess) => {
    //setLoading(true);
    postData(
      "/enrollment/forgot-user-password",
      changePasswordDetails,
      (data) => {
        setResponse(data);
        onSuccess(data);
      }
      //setError
    );
  };

  const logout = (credentials = authenticationModel, onSuccess) => {
    const userCredentials = _.cloneDeep(authenticationModel);
    userCredentials.user_name = credentials.user_name;
    userCredentials.isReadyToAuthenticate = credentials.isReadyToAuthenticate;

    //setLoading(true);
    postData(
      "/enrollment/logout",
      userCredentials,
      (data) => {
        setResponse(data);
        onSuccess(data);
      }
      //setError
    );
  };

  const changePassword = (payload, onSuccess) => {
    //setLoading(true);
    postData(
      "/enrollment/change-user-password",
      payload,
      (data) => {
        setResponse(data);
        onSuccess(data);
      }
      //setError
    );
  };

  return {
    error,
    response,
    login,
    forgotPassword,
    logout,
    processing,
    changePassword,
  };
};

export default useAuthentication;
