/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import WishCarousel from "../components/WishCarousel";
import WishFlipCard from "../components/WishFlipCard";
import WishGeneologyStatsCard from "../components/WishGeneologyStatsCard";
import WishModal from "../components/WishModal";
import WishSimpleCard from "../components/WishSimpleCard";
import WishToaster from "../components/WishToaster";
import Tree from "../components/WishTree/Tree";
import TreeNode from "../components/WishTree/TreeNode";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import WishRankTimeline from "../components/WishTimelines/WishRankTimeline";
import "json-loader";
import data from "../data/Data.json";

//import { Tree, TreeNode } from "react-organizational-chart";

function Header(props) {
  return <h1>This is heading</h1>;
}

export default function TestPage() {
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

  const showPopover = function () {
    $("#btnPopover").fu_popover({
      // show popover arrow
      arrowShow: true,

      // auto hide after 2500ms
      autoHide: false,
      autoHideDelay: 2500,

      // popover content
      content: "<small>Some Content</small>",

      // delay times
      delay: { show: 0, hide: 0 },

      // is dismissable
      dismissable: true,

      // top, bottom, left, right
      placement: "bottom",

      // custom theme
      themeName: "default",

      // popover title
      title: "<h3>Popover Title</h3>",

      // trigger event
      // click | hover | focus | manual
      trigger: "hover",
    });
  };

  const hidePopover = function () {
    $("#btnPopover").fu_popover("hide");
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

  const nodeDetails = function (nodeID) {
    return (
      <>
        {selectedNode && (
          <div className="row">
            <div className="col-12">
              <p>Distributur ID: {selectedNode.distributorID}</p>
              <p>Name: {selectedNode.distributorID}</p>
              <p>Acheived Rank: {selectedNode.distributorID}</p>
              <p>Paid as Rank: {selectedNode.distributorID}</p>
              <p>Activation PV: {selectedNode.distributorID}</p>
              <p>Next activation week: {selectedNode.distributorID}</p>
              <p>Aggregate Income: {selectedNode.distributorID}</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <PageLayout pageTitle="Test Page">
      <section className="row d-flex justify-content-around">
        <div className="col-4">Col 1</div>
        <div className="col-4">Col 2</div>
        <div className="col-4">Col 3</div>
        <div className="col-4">Col 4</div>
        <div className="col-4">Col 5</div>
      </section>

      <WishSimpleCard header={Header()}></WishSimpleCard>
      <WishModal infoMode={"Loading ..."}></WishModal>
      <button
        id="login"
        className="btn btn-primary"
        onClick={() =>
          WishToaster({
            toastMessage: "Some message",
            toastType: "success",
          })
        }
      >
        Show Toast
      </button>

      <button
        type="button"
        className="btn btn-primary"
        id="btnPopover"
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
      >
        On Hover Trigger
      </button>

      <div className="row pt-2">
        <div className="col-6">
          <WishFlipCard showBackFooter>
            {{
              frontHeader: "This is front",
              backHeader: "This is back header",
              front: (
                <div className="row">
                  <div className="col-5">Date of birth:</div>
                  <div className="col-7">
                    <strong>01-Jan-1980</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Preferred Language:</div>
                  <div className="col-7">
                    <strong>English</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Gender:</div>
                  <div className="col-7">
                    <strong>Male</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Maritial Status:</div>
                  <div className="col-7">
                    <strong>Married</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Profession:</div>
                  <div className="col-7">
                    <strong>Businessmen</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Monthly Income:</div>
                  <div className="col-7">
                    <strong>Less than 5000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Aadhar Card:</div>
                  <div className="col-7">
                    <strong>0000 0000 0000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Pancard:</div>
                  <div className="col-7">
                    <strong>00000 00000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">GST Number:</div>
                  <div className="col-7">
                    <strong>0000 0000 0000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Nominee:</div>
                  <div className="col-7">
                    <strong>Shri Gajanan Maharaj</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Nominee Relatioship:</div>
                  <div className="col-7">
                    <strong>Father</strong>
                  </div>
                </div>
              ),
              back: "This is back",
            }}
          </WishFlipCard>
        </div>
        <div className="col-6">
          <WishFlipCard>
            {{
              front: "This is front",
              back: "This is back",
            }}
          </WishFlipCard>
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <WishSimpleCard
            header={
              <div className="d-flex justify-content-between">
                <h5>Org Chart</h5>
                <a
                  onClick={() => {
                    setIsRotated(!isRotated);
                  }}
                >
                  <i className="las la-sync la-2x"></i>
                </a>
              </div>
            }
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
            footer={
              <div className="form-group row align-items-center">
                <div className="col-3">
                  <h5>Enroll new to</h5>
                </div>
                <div className="col-6">
                  <select
                    name="ddOrganization"
                    id="ddOrganization"
                    className="form-control"
                  >
                    <option>First Organization</option>
                    <option>Second Organization</option>
                    <option>Third Organization</option>
                  </select>
                </div>
                <div className="col-3">
                  <button className="btn btn-primary btn-block">Enroll</button>
                </div>
              </div>
            }
          ></WishSimpleCard>
        </div>
        <div className="col-4">
          <h5>DISTRIBUTOR DETAILS</h5>
          <hr />
          <WishSimpleCard body={nodeDetails()}></WishSimpleCard>
        </div>
        <div className="col-4">
          <WishCarousel
            title={"GROUP VOLUME DETAILS"}
            nextLinkTitle="PROCEED"
            showArrows
          >
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
        <div className="col-6">
          <Timeline lineColor={"#ddd"}>
            <TimelineItem
              key="001"
              dateText={
                <img
                  style={{ width: "30px" }}
                  src="../assets/app-assets/images/gallery/2.jpg"
                  alt="seom"
                ></img>
              }
              style={{ color: "#e86971" }}
            >
              <h3>Title, Company</h3>
              <h4>Subtitle</h4>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
            </TimelineItem>
            <TimelineItem
              key="002"
              dateText="04/2009 – 11/2010"
              dateInnerStyle={{ background: "#61b8ff", color: "#000" }}
              bodyContainerStyle={{
                background: "#ddd",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3 style={{ color: "#61b8ff" }}>Title, Company</h3>
              <h4 style={{ color: "#61b8ff" }}>Subtitle</h4>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
            </TimelineItem>
            <TimelineItem
              key="003"
              dateComponent={
                <div className="text-right pr-2">
                  <img
                    style={{ width: "30px" }}
                    src="../assets/app-assets/images/gallery/2.jpg"
                    alt="seom"
                  ></img>
                </div>
              }
            >
              <h3>Title, Company</h3>
              <h4>Subtitle</h4>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
            </TimelineItem>
            <TimelineItem
              key="004"
              dateText="08/2008 – 11/2008"
              dateInnerStyle={{ background: "#76bb7f" }}
            >
              <h3>Title, Company</h3>
              <h4>Subtitle</h4>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
              <p>
                Est incididunt sint eu minim dolore mollit velit velit commodo
                ex nulla exercitation. Veniam velit adipisicing anim excepteur
                nostrud magna nostrud aliqua dolor. Sunt aute est duis ut nulla
                officia irure reprehenderit laborum fugiat dolore in elit.
                Adipisicing do qui duis Lorem est.
              </p>
            </TimelineItem>
          </Timeline>
        </div>
        <div className="col-12">
          <WishRankTimeline data={data.timelineData}></WishRankTimeline>
        </div>
      </div>
    </PageLayout>
  );
}
