/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import parse from "html-react-parser";

export default function WishTabs({ tabs, children, smallTitle, actions }) {
  const elementId = uuidv4();
  const [selectedTab, setSelectedTab] = useState(0);

  const renderSmallTitle = function (title) {
    return <small>{title}</small>;
  };

  const renderTabContent = function (tab) {
    if (children === undefined) {
      return parse(tab.content);
    }

    return children[selectedTab];
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pr-2">
        <ul className="nav nav-tabs">
          {tabs &&
            tabs.map((tab, index) => {
              return (
                <li className="nav-item" key={index}>
                  <a
                    className={
                      "nav-link " + (index === selectedTab ? " active " : "")
                    }
                    id={elementId + "base-tab" + index}
                    data-toggle="tab"
                    aria-controls={elementId + "tab" + index}
                    href={"#" + elementId + "tab" + index}
                    aria-expanded="true"
                    onClick={() => {
                      setSelectedTab(index);
                    }}
                  >
                    {smallTitle === undefined
                      ? tab.title
                      : renderSmallTitle(tab.title)}
                  </a>
                </li>
              );
            })}
        </ul>
        {actions}
      </div>
      <div className="tab-content px-1 pt-1">
        {tabs &&
          tabs.map((tab, index) => {
            return (
              <div
                className={
                  "tab-pane animate__animated " +
                  (index === selectedTab
                    ? " animate__fadeIn active "
                    : " animate__fadeOut ")
                }
                id={elementId + "tab" + index}
                aria-labelledby={elementId + "base-tab" + index}
                aria-expanded={index === selectedTab ? " true " : " false "}
              >
                {renderTabContent(tab)}
              </div>
            );
          })}
      </div>
    </>
  );
}
