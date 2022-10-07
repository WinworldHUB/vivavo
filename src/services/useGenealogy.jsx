import { useEffect } from "react";
import useAPI from "./useAPI";
//import genealogyData from "../data/temp.json";
import _ from "lodash";
import { TreeUtils } from "./TreeUtils";
import { useState } from "react";
//import useMasters from "./useMasters";

export const treeNode = {
  id: String,
  image: String,
  distId: String,
  name: String,
  activityStatus: String,
  achievedRankId: String,
  isActionNode: (Boolean, false),
  isRoot: (Boolean, false),
  isSelectable: (Boolean, false),
  isSelected: (Boolean, false),
  nodes: [],
  parentDistId: String,
  hide: (Boolean, false),
  rankBadge: (String, "Black Diamond Ambassador.png"),
  expanded: (Boolean, false),
  selected: (Boolean, false),
};

export const treeModel = {
  root: treeNode,
};

export const actionNode = {
  id: "action_node",
  image: "",
  distId: "",
  name: "Enroll",
  activityStatus: "-1",
  achievedRankId: "-1",
  isActionNode: true,
  isRoot: false,
  isSelectable: false,
  isSelected: false,
  parentDistId: String,
  hide: false,
  rankBadge: "AddNode.png",
  expanded: false,
  selected: false,
};

const useGenealogy = () => {
  const [geneologyResponse, genealogyError, { postData }] = useAPI();
  const [
    pendingEnrollees,
    pendingEnrolleesError,
    { postData2 },
  ] = useAPI();
  const [ranksList, ranksListError, { getData }] = useAPI();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [ranks, setRanks] = useState([]);
  const [pendingEnrolleesList, setPendingEnrolleesList] = useState([]);
  //const masters = useMasters();

  useEffect(() => {
    getData("/enrollment/fetch-rank-list");
  }, []);

  useEffect(() => {
    if (ranksList) {
      //console.log(ranksList.data);
      setRanks(Array.from(ranksList.data));
    }
  }, [ranksList]);

  const getTreeData = (payload) => {
    postData("/enrollment/load-geneology-redis", payload);

    //processGenealogyData(genealogyData.data.map((x) => x._values));
  };

  useEffect(() => {
    //console.log(geneologyResponse);
    if (geneologyResponse !== null && geneologyResponse.status === "success") {
      const genealogyData = Array.from(geneologyResponse.data);
      processGenealogyData(genealogyData.map((x) => x._values));
    } else if (geneologyResponse) {
      console.log(geneologyResponse.message);
      setError(geneologyResponse.message);
    } else {
      setError("Unknown error");
    }
  }, [geneologyResponse]);

  useEffect(() => {
    setError(genealogyError);
    console.error(genealogyError);
  }, [genealogyError]);

  useEffect(() => {
    if (pendingEnrollees) {
      if (pendingEnrollees.status === "success")
        setPendingEnrolleesList(pendingEnrollees.data);
      else setError(pendingEnrollees.message);
    }
  }, [pendingEnrollees]);

  useEffect(() => {
    if (pendingEnrolleesError) {
      setError(pendingEnrolleesError);
    }
  }, [pendingEnrolleesError]);

  const processGenealogyData = (treeNodes = []) => {
    if (treeNodes.length > 0) {
      //console.clear();
      // console.log(ranksList);

      const processedNodes = [];
      treeNodes.map((node, index) => {
        const currentNodeProperties = treeNodes[index][0].properties;
        const currentNodeNodes = treeNodes[index][1].nodes;
        const currentNodeEdges = treeNodes[index][1].edges;

        if (currentNodeProperties) {
          const { distId, name, activityStatus, achievedRankId } =
            currentNodeProperties;
          const foundRank = ranks.filter(
            (x) => parseInt(x.id) === parseInt(achievedRankId)
          )[0];
          const rankBadgeImage = foundRank.title + ".png";

          const newNode = _.clone(treeNode);
          newNode.id = distId;
          newNode.distId = distId;
          newNode.name = name;
          newNode.activityStatus = activityStatus;
          newNode.achievedRankId = achievedRankId;
          newNode.rankBadge = rankBadgeImage;
          newNode.isRoot = currentNodeEdges.length === 0;

          if (currentNodeEdges.length > 0) {
            newNode.parentDistId =
              currentNodeNodes[currentNodeNodes.length - 2].properties.distId;
          } else {
            newNode.parentDistId = null;
          }

          processedNodes.push(newNode);

          //console.log(processedNodes);
        } else {
          console.log("No properties found");
          console.log(treeNodes[index]);
        }
      });

      setData(TreeUtils.prepareTree(processedNodes));
    }
  };

  const loadDistributor = (distributorId) => {
    getTreeData({
      distributor_id: distributorId,
      depth: 2,
    });
  };

  const getPendingEnrolleesFor = (distributorId) => {
    postData2("/enrollment/fetch-pending-enrollee-list", {
      distributor_id: distributorId,
      section_level: 5,
    });
  };

  return [
    data,
    error,
    {
      getTreeData,
      ranks,
      pendingEnrolleesList,
      loadDistributor,
      getPendingEnrolleesFor,
    },
  ];
};

export default useGenealogy;
