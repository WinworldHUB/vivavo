import _ from "lodash";
import { treeModel } from "./useGenealogy";

export const TreeUtils = {
  prepareTree: function (nodesArray = []) {
    console.log(nodesArray);

    const output = _.clone(treeModel);

    output.root = _.cloneDeep(nodesArray[0]);

    const firstLevelNodes = nodesArray.filter(
      (x) => x.parentDistId === output.root.distId
    );

    output.root.nodes = _.cloneDeep(firstLevelNodes);

    console.log(output.root.nodes.length);

    for (let index = 0; index < output.root.nodes.length; index++) {
      const element = output.root.nodes[index];

      const secondLevelNodes = nodesArray.filter(
        (x) => x.parentDistId === element.distId
      );

      output.root.nodes[index].nodes = _.cloneDeep(secondLevelNodes);
    }

    return output;
  },
};
