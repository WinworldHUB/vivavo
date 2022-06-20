/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import WishCarousel from "../components/WishCarousel";
import WishGeneologyStatsCard from "../components/WishGeneologyStatsCard";
import WishGeneologyTree from "../components/WishGeneologyTree";
import WishSimpleCard from "../components/WishSimpleCard";

export default function MyGeneology() {
  const [isRotated, setIsRotated] = useState(true);
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
  const [treeNodes, setTreeNodes] = useState({
    title: "Root Node",
    id: 0,
    distributorID: "1000",
    name: "John Doe",
    achievedRank: "Royal Black Diamond",
    paidAsRank: "Ruby Executive",
    status: "Active",
    activationPV: "100",
    nextActivationWeek: "433",
    aggregateIncome: "2,39,837",
    expanded: true,
    selected: true,
    nodes: [
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
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 12",
            id: 12,
            distributorID: "12001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
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
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 22",
            id: 22,
            distributorID: "22001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
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
        name: "John Doe",
        achievedRank: "Royal Black Diamond",
        paidAsRank: "Ruby Executive",
        status: "Active",
        activationPV: "100",
        nextActivationWeek: "433",
        aggregateIncome: "2,39,837",
        expanded: true,
        selected: false,
        nodes: [
          {
            title: "Child 31",
            id: 31,
            distributorID: "31001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 32",
            id: 32,
            distributorID: "32001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 33",
            id: 33,
            distributorID: "33001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
        ],
      },
    ],
  });

  const [selectedNode, setSelectedNode] = useState(treeNodes);

  const nodeDetails = function (nodeID) {
    return (
      <>
        {selectedNode && (
          <>
            <p>Distributur ID: {selectedNode.distributorID}</p>
            <p>Name: {selectedNode.name}</p>
            <p>Acheived Rank: {selectedNode.achievedRank}</p>
            <p>Paid as Rank: {selectedNode.paidAsRank}</p>
            <p>Activation PV: {selectedNode.activationPV}</p>
            <p>Next activation week: {selectedNode.nextActivationWeek}</p>
            <p>Aggregate Income: {selectedNode.aggregateIncome}</p>
          </>
        )}
      </>
    );
  };

  const treeFooter = function () {
    return (
      selectedNode && (
        <div className="d-flex justify-content-between">
          <a className="card-link link-dotted">Enroll New User</a>

          <a className="card-link link-dotted">Go to Distributor</a>
        </div>
      )
    );
  };

  return (
    <PageLayout pageTitle="My Geneology" activeSideMenu="4">
      <div className="row">
        <div className="col-12 table-responsive">
          <WishGeneologyTree
            reverse={isRotated}
            tree={treeNodes}
            onNodeSelected={(node) => {
              setSelectedNode(node);
            }}
          ></WishGeneologyTree>
        </div>
      </div>
      <div className={"row " + (selectedNode ?? " hidden ")}>
        <div className="col-sm-4">
          <WishSimpleCard
            background="bg-primary bg-lighten-4"
            header={<h5>DISTRIBUTOR DETAILS</h5>}
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
