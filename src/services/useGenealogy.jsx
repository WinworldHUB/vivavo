import useAPI from "./useAPI";
import genealogyData from "../data/temp.json";
import _ from "lodash";
import { TreeUtils } from "./TreeUtils";

export const treeNode = {
  image: String,
  distId: String,
  name: String,
  activityStatus: String,
  isActionNode: (Boolean, false),
  isRoot: (Boolean, false),
  isSelectable: (Boolean, false),
  isSelected: (Boolean, false),
  nodes: [],
  parentDistId: String,
};

export const treeModel = {
  root: treeNode,
};

const useGenealogy = () => {
  const [data, error, { postData, getData }] = useAPI();

  const getTreeData = (payload) => {
    postData("/enrollment/load-geneology-redis", JSON.stringify(payload));

    processGenealogyData(genealogyData.data.map((x) => x._values));
  };

  const processGenealogyData = (treeNodes = []) => {
    if (treeNodes.length > 0) {
      console.clear();
      console.log(treeNodes);
      
      const processedNodes = [];
      treeNodes.map((node, index) => {
        const currentNodeProperties = treeNodes[index][0].properties;
        const currentNodeNodes = treeNodes[index][1].nodes;
        const currentNodeEdges = treeNodes[index][1].edges;
        if (currentNodeProperties) {
          const { distId, name, activityStatus } = currentNodeProperties;

          const newNode = _.clone(treeNode);
          newNode.distId = distId;
          newNode.name = name;
          newNode.activityStatus = activityStatus;
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
        
        console.log(TreeUtils.prepareTree (processedNodes));
    }
  };

  return [data, error, { getTreeData }];
};

export default useGenealogy;
