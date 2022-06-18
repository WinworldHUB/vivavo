/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import WishModal from "./WishModal";
import WishSimpleCard from "./WishSimpleCard";
import Tree from "./WishTree/Tree";
import TreeNode from "./WishTree/TreeNode";
import WishToaster from "./WishToaster";

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
}) {
  const [isRotated, setIsRotated] = useState(
    reverse !== undefined ? reverse : false
  );
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [treeNodes, setTreeNodes] = useState(tree);

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
        <div className="d-flex justify-content-between">
          <a
            className="card-link link-dotted"
            data-target="#dlgEnrollUser"
            data-toggle="modal"
          >
            Enroll New User
          </a>

          <a
            className="card-link link-dotted"
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
        </div>
      )
    );
  };

  return (
    <>
      <WishSimpleCard
        header={treeHeader()}
        body={
          <div
            className={
              isRotated === false ? " wish-rotate-0 " : " wish-rotate-180 "
            }
          >
            <small>{subTitle ?? ""}</small>
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
        </div>
      </WishModal>
    </>
  );
}
