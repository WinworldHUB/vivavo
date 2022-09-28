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
  // const [authenticationDetails, setAuthenticationDetails] = useState(
  //   _.cloneDeep(authenticationModel)
  // );

  // const returnValue = credentials.isReadyToAuthenticate ? useAPI(
  //   "POST",
  //   "/enrollment/login_dummy",
  //   authenticationDetails
  // ) : null;

  // useEffect(() => {
  //   if (credentials.isReadyToAuthenticate) {
  //     setAuthenticationDetails(credentials);
  //   }
  // }, [credentials]);

  // return returnValue;

  const [response, postData] = useAPI();

  const login = (credentials = authenticationModel) => {
    postData("/enrollment/login_dummy", credentials);
  };

  const changePassword = (changePasswordDetails = changePasswordModel) => {
    postData("/enrollment/forgot-user-password", changePasswordDetails);
  };

  return [response, { login, changePassword }];
};

export default useAuthentication;
