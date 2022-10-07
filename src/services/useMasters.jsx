import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import APIUtils from "./APIUtils";
import useAPI from "./useAPI";

const MastersModel = {
  ranks: (Array, []),
};

const useMasters = () => {
  const [ranks, setRanks] = useLocalStorage("ranks", null);
  const [ranksList, setRanksList] = useState(null);
  const [mastersError, setError] = useState(null);

  useEffect(() => {
    if (ranks && ranks !== "") {
      const ranksFromLocalStorage = JSON.parse(ranks);

      setRanksList(ranksFromLocalStorage);
    } else {
      APIUtils.getData(
        "/enrollment/fetch-rank-list",
        (ranksData) => {
          setRanksList(ranksData);
          setRanks(JSON.stringify(ranksData));
        },
        setError
      );
    }
  }, []);

  return { ranksList, mastersError };
};

export default useMasters;
