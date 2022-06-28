/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import parse from "html-react-parser";

export default function WishTabs({ tabs, children, smallTitle }) {
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
      <ul className="nav nav-tabs">
        {tabs &&
          tabs.map((tab, index) => {
            return (
              <li className="nav-item" key={index}>
                <a
                  class={
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
      <div class="tab-content px-1 pt-1">
        {tabs &&
          tabs.map((tab, index) => {
            return (
              <div
                class={
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

      {/* <div
          role="tabpanel"
          class="tab-pane active"
          id="tab1"
          aria-expanded="true"
          aria-labelledby="base-tab1"
        >
          <p>
            Oat cake marzipan cake lollipop caramels wafer pie jelly beans.
            Icing halvah chocolate cake carrot cake. Jelly beans carrot cake
            marshmallow gingerbread chocolate cake. Gummies cupcake croissant.
          </p>
        </div>
        <div class="tab-pane" id="tab2" aria-labelledby="base-tab2">
          <p>
            Sugar plum tootsie roll biscuit caramels. Liquorice brownie pastry
            cotton candy oat cake fruitcake jelly chupa chups. Pudding caramels
            pastry powder cake soufflé wafer caramels. Jelly-o pie cupcake.
          </p>
        </div>
        <div class="tab-pane" id="tab3" aria-labelledby="base-tab3">
          <p>
            Biscuit ice cream halvah candy canes bear claw ice cream cake
            chocolate bar donut. Toffee cotton candy liquorice. Oat cake lemon
            drops gingerbread dessert caramels. Sweet dessert jujubes powder
            sweet sesame snaps.
          </p>
        </div>
      </div> */}
    </>
  );
}
