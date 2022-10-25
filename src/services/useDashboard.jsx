import { useState } from "react";
import APIUtils from "./APIUtils";

const useDashboard = (distributor) => {
  const [error, setError] = useState(null);

  const getNotifications = (onSuccess) => {
    APIUtils.postData(
      "/enrollment/fetch-dist-notification",
      { distributor_id: distributor.distributor_id },
      (data) => {
        onSuccess(data);
      },
      setError
    );
  };

  return [error, { getNotifications }];
};

export default useDashboard;
