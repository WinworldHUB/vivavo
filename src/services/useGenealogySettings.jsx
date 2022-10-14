import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import APIUtils from "./APIUtils";

const useGenealogySettings = (distributorId) => {
  const [loggedInDistributor, setLoggedInDistributor] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [settingsError, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPreferences = () => {
    if (loggedInDistributor) {
      setLoading(true);
      APIUtils.postData(
        "/enrollment/fetch-dist-preferences",
        {
          distributor_id: loggedInDistributor,
        },
        (data) => {
          setLoading(false);
          setPreferences(data);
        },
        setError
      );
    } else {
      setError("Invalid distributor Id");
    }
  };

  useEffect(() => {
    if (settingsError) {
      setLoading(false);
    }
  }, [settingsError]);

  useMemo(() => {
    if (distributorId) {
      setLoggedInDistributor(distributorId);
      fetchPreferences();
    }
  }, [distributorId]);

  return { preferences, settingsError, fetchPreferences };
};

export default useGenealogySettings;
