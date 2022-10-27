import { useEffect } from "react";
import { useState } from "react";
import useAPIs from "./useAPIs";
//import APIUtils from "./APIUtils";

const useDashboard = (distributor) => {
  const { apiError, postData } = useAPIs();
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  const getNotifications = (onSuccess) => {
    postData(
      "/enrollment/fetch-dist-notification",
      { distributor_id: distributor.distributor_id },
      (data) => {
        onSuccess(data);
      }
    );
  };

  return [error, { getNotifications }];
};

export default useDashboard;
