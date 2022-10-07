import _ from "lodash";
import { actionNode, treeModel } from "./useGenealogy";

export const TreeUtils = {
  prepareTree: function (nodesArray = []) {
    console.log(nodesArray);

    const output = _.clone(treeModel);

    output.root = _.cloneDeep(nodesArray[0]);

    const firstLevelNodes = nodesArray.filter(
      (x) => x.parentDistId === output.root.distId
    );

    var actionButtonPosition = firstLevelNodes.length / 2;

    firstLevelNodes.splice(
      actionButtonPosition,
      0,
      this.generateActionNodeFor(output.root.distId)
    );

    output.root.nodes = _.cloneDeep(firstLevelNodes);

    for (let index = 0; index < output.root.nodes.length; index++) {
      const element = output.root.nodes[index];

      if (!element.isActionNode) {
        const secondLevelNodes = nodesArray.filter(
          (x) => x.parentDistId === element.distId
        );

        actionButtonPosition = secondLevelNodes.length / 2;

        secondLevelNodes.splice(
          actionButtonPosition,
          0,
          this.generateActionNodeFor(element.distId)
        );

        output.root.nodes[index].nodes = _.cloneDeep(secondLevelNodes);
      }
    }

    return output;
  },

  generateActionNodeFor: (distributorId) => {
    const newActionNode = _.cloneDeep(actionNode);
    newActionNode.parentDistId = distributorId;

    return newActionNode;
  },
};
