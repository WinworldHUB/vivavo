import _ from "lodash";
import { actionNode, treeModel } from "./useGenealogy";
import { NODE_POSITIONS } from "./Constants";

export const TreeUtils = {
  /// Return Values
  /// 0 = Only center button to be shown
  /// 1 = Left + Center button to be shown
  /// 2 = Right + Center button to be shown
  /// 3 = Left + Center + Right button to be shown
  processNodeRelations: (nodeEdges = []) => {
    if (nodeEdges && nodeEdges.length > 0) {
      console.log(nodeEdges.map((x) => x.relation.toLowerCase()));
      if (
        !nodeEdges.some((x) =>
          NODE_POSITIONS.includes(x.relation.toLowerCase())
        )
      ) {
        return 0;
      } else {
        const buttonPosition = nodeEdges.findIndex(
          (x) => x.relation.toLowerCase() === NODE_POSITIONS[0]
        );

        if (buttonPosition > -1) {
          console.log("Place button on right");
          return 2;
        } else {
          console.log("Place button on left");
          return 1;
        }
      }
    } else {
      console.log("3 buttons required");
      return 3;
    }
  },

  prepareTree: function (nodesArray = []) {
    console.log(nodesArray);

    const output = _.clone(treeModel);

    output.root = _.cloneDeep(nodesArray[0]);

    const firstLevelNodes = nodesArray.filter(
      (x) => x.parentDistId === output.root.distId
    );

    console.log("First Level Nodes");
    console.log(firstLevelNodes);

    var actionButtonPosition = firstLevelNodes.length / 2;

    firstLevelNodes.splice(
      actionButtonPosition,
      0,
      output.root.isBerthEnabled
        ? this.generateActionNodeFor(output.root.distId)
        : this.generateDisabledActionNodeFor(output.root.distId)
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
          element.isBerthEnabled
            ? this.generateActionNodeFor(element.distId)
            : this.generateDisabledActionNodeFor(element.distId)
        );

        output.root.nodes[index].nodes = _.cloneDeep(secondLevelNodes);
      }
    }

    return output;
  },

  generateActionNodeFor: (distributorId) => {
    const newActionNode = _.cloneDeep(actionNode);
    newActionNode.parentDistId = distributorId;
    newActionNode.isBerthEnabled = true;

    return newActionNode;
  },

  generateDisabledActionNodeFor: (distributorId) => {
    const newActionNode = _.cloneDeep(actionNode);
    newActionNode.parentDistId = distributorId;
    newActionNode.rankBadge = "AddNodeDisabled.png";
    newActionNode.isBerthEnabled = false;

    return newActionNode;
  },
};
