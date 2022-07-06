/* eslint-disable no-undef */
import React from "react";
import { css } from "@emotion/css";
import TreeNode from "./TreeNode";

import { Action, Fab } from "react-tiny-fab";
import { useState } from "react";
import WishModal from "../WishModal";
import { useEffect } from "react";

export default function Tree({
  children,
  label,
  lineHeight = "30px",
  lineWidth = "1px",
  lineColor = "black",
  nodePadding = "5px",
  lineBorderRadius = "5px",
  reverse = true,
  onSearchClick,
  onBackButtonClick,
  displayBackButton = false,
}) {
  const [flip, doFlip] = useState(reverse ?? true);
  const [showBackButton, setShowBackButton] = useState(displayBackButton);

  useEffect(() => {
    setShowBackButton(displayBackButton);
  }, [displayBackButton]);

  const [filterText, setFilterText] = useState("");

  const fabChildren = [
    {
      title: "Go back",
      icon: "las la-angle-left",
      visible: true,
      onClick: () => {
        setShowBackButton(false);
        onBackButtonClick && onBackButtonClick();
      },
    },
    {
      title: "Search",
      icon: "las la-search",
      visible: true,
      onClick: () => {
        $("#dlgSearch").modal("show");
      },
    },
    {
      title: "Rotate",
      icon: "las la-sync",
      visible: true,
      onClick: () => {
        doFlip(!flip);
      },
    },
  ];

  return (
    <div className="table-responsive text-center">
      <ul
        className={
          css`
            padding-inline-start: 0;
            margin: 0;
            display: flex;
            padding: 10px 0;
            text-align: center;
            align-items: center;

            --line-height: ${lineHeight};
            --line-width: ${lineWidth};
            --line-color: ${lineColor};
            --line-border-radius: ${lineBorderRadius};
            --node-padding: ${nodePadding};

            --tree-line-height: var(--line-height, 20px);
            --tree-line-width: var(--line-width, 1px);
            --tree-line-color: var(--line-color, black);
            --tree-line-border-radius: var(--line-border-radius, 5px);
            --tree-node-padding: var(--node-padding, 5px);
          ` + (reverse === false ? " wish-rotate-0 " : " wish-rotate-180 ")
        }
      >
        <TreeNode label={label} isRoot>
          {children}
        </TreeNode>
      </ul>

      {/* <Fab
        alwaysShowTitle={false}
        mainButtonStyles={{ backgroundColor: "var(--primary)" }}
        icon={<i className="las la-plus"></i>}
        style={{ right: "10px", bottom: "30px" }}
      >
        {fabChildren.map((child, index) => {
          if (showBackButton === true) {
            return (
              <Action
                text={child.title}
                onClick={() => {
                  child.onClick && child.onClick();
                }}
              >
                <i className={child.icon} />
              </Action>
            );
          } else if (index > 0) {
            return (
              <Action
                text={child.title}
                onClick={() => {
                  child.onClick && child.onClick();
                }}
              >
                <i className={child.icon} />
              </Action>
            );
          }
        })}
      </Fab> */}

      <WishModal
        id="dlgSearch"
        modalSize="modal-lg"
        noFooter
        infoMode={
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search distributor id ..."
                  value={filterText}
                  onChange={(e) => {
                    setFilterText(e.target.value.trim());
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (filterText !== "") {
                        onSearchClick && onSearchClick(filterText);
                        setShowBackButton(true);
                      }
                      $("#dlgSearch").modal("hide");
                    }}
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      ></WishModal>
    </div>
  );
}
