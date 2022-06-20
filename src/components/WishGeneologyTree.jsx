/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import WishModal from "./WishModal";
import WishSimpleCard from "./WishSimpleCard";
import Tree from "./WishTree/Tree";
import TreeNode from "./WishTree/TreeNode";
import WishToaster from "./WishToaster";
import WishSelect from "./WishSelect";

export default function WishGeneologyTree({
  tree,
  title,
  reverse,
  showRotationKnob,
  subTitle,
  treeFooter,
  onNodeSelected,
  onOrganizationSelected,
  organizations,
  hideExitingEnrollments,
}) {
  const [isRotated, setIsRotated] = useState(
    reverse !== undefined ? reverse : false
  );
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [treeNodes, setTreeNodes] = useState(tree.nodes);

  const existingEnrollments = [
    "New Enrollment",
    "John Doe 1 (ongoing enrollments)",
    "John Doe 2 (ongoing enrollments)",
    "John Doe 3 (ongoing enrollments)",
    "John Doe 4 (ongoing enrollments)",
  ];

  const organizationsArray = organizations ?? [
    "Left Organization",
    "Right Organization",
  ];

  const clearNodeSelection = function () {
    const treeNodesCopy = Array.from(treeNodes);
    treeNodesCopy.forEach(function (treenode, index) {
      treenode.selected = false;

      treenode.nodes.forEach((node, index) => {
        node.selected = false;
      });
    });

    setSelectedNode(null);
    setTreeNodes(treeNodesCopy);
    onNodeSelected && onNodeSelected(null);
  };

  const onClicked = function (id) {
    const treeNodesCopy = Array.from(treeNodes);
    treeNodesCopy.forEach(function (treenode, index) {
      treenode.selected = false;
      if (treenode.id === id) {
        treenode.selected = true;
        setSelectedNode(treenode);
        onNodeSelected && onNodeSelected(treenode);
      }

      treenode.nodes.forEach((node, index) => {
        node.selected = false;
        if (node.id === id) {
          node.selected = true;
          setSelectedNode(node);
          onNodeSelected && onNodeSelected(node);
        }
      });
    });

    setTreeNodes(treeNodesCopy);
  };

  const treeHeader = function () {
    if (title !== undefined || showRotationKnob !== undefined) {
      return (
        <div className="d-flex justify-content-between">
          {title ?? ""}
          {showRotationKnob && (
            <a
              onClick={(e) => {
                e.stopPropagation();
                setIsRotated(!isRotated);
              }}
            >
              <i className="las la-sync"></i>
            </a>
          )}
        </div>
      );
    } else return;
  };

  const defaultTreeFooter = function () {
    return (
      selectedNode && (
        <>
          <a
            className="card-link link-dotted mr-auto"
            data-target="#dlgEnrollUser"
            data-toggle="modal"
          >
            Enroll New User
          </a>

          <a
            className="card-link link-dotted ml-auto"
            onClick={() => {
              WishToaster({
                toastMessage: "Reloaded tree with selected distributor",
                toastType: "success",
              });
              clearNodeSelection();
            }}
          >
            Go to Distributor
          </a>
        </>
      )
    );
  };

  const renderTreeNode = function (node) {
    return (
      <a class="media border-0 d-flex align-items-center">
        <div class="media-left pr-1">
          <span class="avatar avatar-md avatar-online">
            <img
              class="media-object rounded-circle"
              src="../assets/app-assets/images/logo/logo.png"
              alt="Generic placeholder image"
            />
          </span>
        </div>
        <div class="media-body w-100 text-left">
          <span class="list-group-item-heading">
            <small>Name: {node.title}</small>
          </span>
          <p class="list-group-item-text mb-0">
            <span class="blue-grey lighten-2 font-small-3">
              {" "}
              <small>ID: {node.id}</small>{" "}
            </span>
          </p>
        </div>
      </a>
    );
  };

  return (
    <>
      <WishSimpleCard
        header={treeHeader()}
        body={
          <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <div
              className={
                isRotated === false ? " wish-rotate-0 " : " wish-rotate-180 "
              }
              style={{ width: "max-content" }}
            >
              <small>{subTitle ?? ""}</small>
              <Tree label={tree.name} lineWidth={"2px"}>
                {treeNodes.map((treenode, index) => {
                  return (
                    <TreeNode
                      label={renderTreeNode(treenode)}
                      id={treenode.id}
                      key={index}
                      selected={treenode.selected}
                      onClick={onClicked}
                    >
                      {treenode.nodes.length > 0 &&
                        treenode.nodes.map((node, nIndex) => {
                          return (
                            <TreeNode
                              label={renderTreeNode(node)}
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
          </div>
        }
        footer={treeFooter ?? defaultTreeFooter()}
      ></WishSimpleCard>
      <WishModal id="dlgEnrollUser" title="Enroll New User" finishTitle="Done">
        <div className="text-center">
          <div
            class="btn-group"
            role="group"
            aria-label="New Enrollment Position"
          >
            {organizationsArray.map((organization, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={
                    "btn " +
                    (selectedOrganization === undefined
                      ? " btn-light "
                      : selectedOrganization === index
                      ? " btn-primary "
                      : " btn-light ")
                  }
                  onClick={() => {
                    setSelectedOrganization(index);
                  }}
                >
                  {organization}
                </button>
              );
            })}
          </div>
          <div
            className={
              "pt-2 " +
              (hideExitingEnrollments && " hidden ") +
              (selectedOrganization ?? " hidden ")
            }
          >
            <WishSelect
              label="Select Enrollment"
              data={existingEnrollments}
            ></WishSelect>
          </div>
        </div>
      </WishModal>
    </>
  );
}
