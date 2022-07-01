/* eslint-disable no-undef */
import React, { useState } from "react";
import { css, cx } from "@emotion/css";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import "./tree.css";

export default function TreeNode({
  children,
  label,
  className,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  selected,
  isRoot,
  id,
  details,
  hide,
}) {
  const nodeID = id ?? uuidv4();

  const verticalLine = css`
    content: "";
    position: absolute;
    top: 0;
    height: var(--tree-line-height);
    box-sizing: border-box;
  `;

  const childrenContainer = css`
    display: flex;
    padding-inline-start: 0;
    margin: 0;
    padding-top: var(--tree-line-height);
    position: relative;

    ::before {
      ${verticalLine};
      left: 50%;
      width: 0;
      border-left: var(--tree-line-width) solid var(--tree-line-color);
    }
  `;

  const node = css`
    flex: auto;
    text-align: center;
    list-style-type: none;
    position: relative;
    line-height: 1.2 !important;
    padding: var(--tree-line-height) var(--tree-node-padding) 0
      var(--tree-node-padding);
  `;

  const nodeLines = css`
    ::before,
    ::after {
      ${verticalLine};
      right: 50%;
      width: 50%;
      border-top: var(--tree-line-width) solid var(--tree-line-color);
    }
    ::after {
      left: 50%;
      border-left: var(--tree-line-width) solid var(--tree-line-color);
    }

    :only-of-type {
      padding: 0;
      ::after,
      :before {
        display: none;
      }
    }

    :first-of-type {
      ::before {
        border: 0 none;
      }
      ::after {
        border-radius: var(--tree-line-border-radius) 0 0 0;
      }
    }

    :last-of-type {
      ::before {
        border-right: var(--tree-line-width) solid var(--tree-line-color);
        border-radius: 0 var(--tree-line-border-radius) 0 0;
      }
      ::after {
        border: 0 none;
      }
    }
  `;

  return (
    <li className={cx(node, nodeLines, className)}>
      <label
        id={nodeID}
        onMouseEnter={() => {
          onMouseEnter && onMouseEnter(nodeID);
          //onClick && onClick(nodeID);
        }}
        onMouseLeave={() => {
          onMouseLeave && onMouseLeave(nodeID);
          //hideTooltip();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick(nodeID);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onDoubleClick && onDoubleClick(nodeID);
        }}
        className={
          "hand-cursor pull-up " +
          (selected && selected === true ? " selected shadow " : " treenode ") +
          (isRoot && " rootNode ") +
          (hide && " hidden ")
        }
      >
        {label}
      </label>

      {React.Children.count(children) > 0 && (
        <ul className={childrenContainer}>{children}</ul>
      )}
    </li>
  );
}
