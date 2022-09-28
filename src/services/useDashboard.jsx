import React, { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import { UserDataModel } from "./VODataModels";
import _ from "lodash";

const dashboardModel = {
  isUserAuthenticated: (Boolean, false),
};

const useDashboard = () => {
  const [returnValue, setReturnValue] = React.useState(
    _.cloneDeep(dashboardModel)
  );

  const [user, updateUser] = useLocalStorage("distributor", "");

  useEffect(() => {
    console.log("User authentication checked.");
    const newReturnValue = _.cloneDeep(returnValue);

    if (user !== "") {
      const userFromLocalStorage = JSON.parse(user);

      newReturnValue.isUserAuthenticated =
        parseInt(userFromLocalStorage.distributor_id) === -1 ? false : true;
    } else {
      updateUser(JSON.stringify(UserDataModel));
      newReturnValue.isUserAuthenticated = false;
    }
    setReturnValue(newReturnValue);
  }, []);

  return returnValue;
};

export default useDashboard;
