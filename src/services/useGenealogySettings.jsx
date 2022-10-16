import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import APIUtils from "./APIUtils";

const useGenealogySettings = (distributorId) => {
  const [preferences, setPreferences] = useState(null);
  const [settingsError, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPreferences = () => {
    if (distributorId) {
      setLoading(true);
      APIUtils.postData(
        "/enrollment/fetch-dist-preferences",
        {
          distributor_id: distributorId,
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
      fetchPreferences();
    }
  }, [distributorId]);

  const savePreferences = (newPreferences) => {
    setLoading(true);
    APIUtils.postData(
      "/enrollment/set-dist-preferences",
      newPreferences,
      () => {
        fetchPreferences();
        setLoading(false);
      },
      setError
    );
  };

  return { preferences, settingsError, fetchPreferences, savePreferences };
};

export default useGenealogySettings;
