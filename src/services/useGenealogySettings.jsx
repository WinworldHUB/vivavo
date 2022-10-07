import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import APIUtils from "./APIUtils";

const useGenealogySettings = (distributorId) => {
  const [loggedInDistributor, setLoggedInDistributor] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [settingsError, setError] = useState(null);

  useMemo(() => {
    setLoggedInDistributor(distributorId);
  }, [distributorId]);

  const fetchPreferences = () => {
    if (loggedInDistributor) {
      APIUtils.postData(
        "/enrollment/fetch-dist-preferences",
        {
          distributor_id: loggedInDistributor,
        },
        setPreferences,
        setError
      );
    } else {
      setError("Invalid distributor Id");
    }
  };

  return { preferences, settingsError, fetchPreferences };
};

export default useGenealogySettings;
