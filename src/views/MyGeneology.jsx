/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import WishCarousel from "../components/WishCarousel";
import WishGeneologyStatsCard from "../components/WishGeneologyStatsCard";
import WishSimpleCard from "../components/WishSimpleCard";
import Tree from "../components/WishTree/Tree";
import TreeNode from "../components/WishTree/TreeNode";

export default function MyGeneology() {
  const [isRotated, setIsRotated] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const currentWeekStats = [
    { key: "LGV", value: 500 },
    { key: "RGV", value: 300 },
    { key: "CFL", value: 50 },
    { key: "CFR", value: 0 },
    { key: "Total LGV", value: 550 },
    { key: "Total RGV", value: 500 },
  ];
  const previousWeekStats = [
    { key: "LGV", value: 500 },
    { key: "RGV", value: 300 },
    { key: "CFL", value: 50 },
    { key: "CFR", value: 0 },
    { key: "Total LGV", value: 550 },
    { key: "Total RGV", value: 500 },
  ];

  const currentWeekStats3 = [{ key: "GV", value: 400 }];
  const previousWeekStats3 = [{ key: "GV", value: 400 }];
  const [treeNodes, setTreeNodes] = useState([
    {
      title: "Child 1",
      id: 1,
      distributorID: "1001",
      expanded: true,
      selected: false,
      nodes: [
        {
          title: "Child 11",
          id: 11,
          distributorID: "11001",
          expanded: true,
          selected: false,
          nodes: [],
        },
        {
          title: "Child 12",
          id: 12,
          distributorID: "12001",
          expanded: true,
          selected: false,
          nodes: [],
        },
      ],
    },
    {
      title: "Child 2",
      id: 2,
      distributorID: "2001",
      expanded: true,
      selected: false,
      nodes: [
        {
          title: "Child 21",
          id: 21,
          distributorID: "21001",
          expanded: true,
          selected: false,
          nodes: [],
        },
        {
          title: "Child 22",
          id: 22,
          distributorID: "22001",
          expanded: true,
          selected: false,
          nodes: [],
        },
      ],
    },
    {
      title: "Child 3",
      id: 3,
      distributorID: "3001",
      expanded: true,
      selected: false,
      nodes: [
        {
          title: "Child 31",
          id: 31,
          distributorID: "31001",
          expanded: true,
          selected: false,
          nodes: [],
        },
        {
          title: "Child 32",
          id: 32,
          distributorID: "32001",
          expanded: true,
          selected: false,
          nodes: [],
        },
        {
          title: "Child 33",
          id: 33,
          distributorID: "33001",
          expanded: true,
          selected: false,
          nodes: [],
        },
      ],
    },
  ]);

  const nodeDetails = function (nodeID) {
    return (
      <>
        {selectedNode && (
          <>
            <p>Distributur ID: {selectedNode.distributorID}</p>
            <p>Name: {selectedNode.distributorID}</p>
            <p>Acheived Rank: {selectedNode.distributorID}</p>
            <p>Paid as Rank: {selectedNode.distributorID}</p>
            <p>Activation PV: {selectedNode.distributorID}</p>
            <p>Next activation week: {selectedNode.distributorID}</p>
            <p>Aggregate Income: {selectedNode.distributorID}</p>
          </>
        )}
      </>
    );
  };

  const onClicked = function (id) {
    const treeNodesCopy = Array.from(treeNodes);
    treeNodesCopy.forEach(function (treenode, index) {
      treenode.selected = false;
      if (treenode.id === id) {
        treenode.selected = true;
        setSelectedNode(treenode);
      }

      treenode.nodes.forEach((node, index) => {
        node.selected = false;
        if (node.id === id) {
          node.selected = true;
          setSelectedNode(node);
        }
      });
    });

    setTreeNodes(treeNodesCopy);
  };

  return (
    <PageLayout pageTitle="My Geneology" activeSideMenu="4">
      <div className="row">
        <div className="col-12 table-responsive">
          <WishSimpleCard
            body={
              <div
                className={
                  isRotated === false ? " wish-rotate-0 " : " wish-rotate-180 "
                }
              >
                <Tree label="Root" lineWidth={"2px"}>
                  {treeNodes.map((treenode, index) => {
                    return (
                      <TreeNode
                        label={treenode.title}
                        id={treenode.id}
                        key={index}
                        selected={treenode.selected}
                        onClick={onClicked}
                      >
                        {treenode.nodes.length > 0 &&
                          treenode.nodes.map((node, nIndex) => {
                            return (
                              <TreeNode
                                label={node.title}
                                id={node.id}
                                key={nIndex}
                                selected={node.selected}
                                onClick={onClicked}
                              ></TreeNode>
                            );
                          })}
                      </TreeNode>
                    );
                  })}
                </Tree>
              </div>
            }
          ></WishSimpleCard>
        </div>
      </div>
      <div className={"row " + (selectedNode ?? " hidden ")}>
        <div className="col-sm-4">
          <WishSimpleCard
            header="DISTRIBUTOR DETAILS"
            body={nodeDetails()}
          ></WishSimpleCard>
        </div>
        <div className="col-sm-8">
          <WishCarousel showArrows>
            <WishGeneologyStatsCard
              renderWithoutCard
              title="First Organization"
              statsCurrentWeek={currentWeekStats}
              statsPreviousWeek={previousWeekStats}
            ></WishGeneologyStatsCard>
            <WishGeneologyStatsCard
              renderWithoutCard
              title="Second Organization"
              statsCurrentWeek={currentWeekStats}
              statsPreviousWeek={previousWeekStats}
            ></WishGeneologyStatsCard>
            <WishGeneologyStatsCard
              renderWithoutCard
              title="Third Organization"
              statsCurrentWeek={currentWeekStats3}
              statsPreviousWeek={previousWeekStats3}
            ></WishGeneologyStatsCard>
          </WishCarousel>
        </div>
      </div>
    </PageLayout>
  );
}
