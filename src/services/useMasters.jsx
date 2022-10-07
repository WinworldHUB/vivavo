import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import useAPI from "./useAPI";

const MastersModel = {
  ranks: (Array, []),
};

const useMasters = () => {
  const [ranksList, ranksError, { getData }] = useAPI();
  const [masters, setMasters] = useLocalStorage("masters", "");
  const [mastersData, setMastersData] = useState(_.cloneDeep(MastersModel));

  useEffect(() => { 
    if (masters !== "" && !masters.ranks) {
      getData("/enrollment/fetch-rank-list");
    } 
  }, []);

  useEffect(() => {
    if (ranksList) {
      console.log(ranksList.data);
      mastersData.ranks = Array.from(ranksList.data);
    } else {
      console.log("No ranks found");
    }
  }, [ranksList]);

  useEffect(() => {
    if (mastersData) {
      setMasters(JSON.stringify(mastersData));
    }
  }, [mastersData]);

  return mastersData;
};

export default useMasters;
