/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import WishFlipCard from "../components/WishFlipCard";
import WishModal from "../components/WishModal";
import WishSimpleCard from "../components/WishSimpleCard";
import WishToaster from "../components/WishToaster";
import Tree from "../components/WishTree/Tree";
import TreeNode from "../components/WishTree/TreeNode";
//import { Tree, TreeNode } from "react-organizational-chart";

function Header(props) {
  return <h1>This is heading</h1>;
}

export default function TestPage() {
  const [isRotated, setIsRotated] = useState(false);

  useEffect(() => {
    $("#btnPopover").fu_popover({
      // show popover arrow
      arrowShow: true,

      // auto hide after 2500ms
      autoHide: false,
      autoHideDelay: 2500,

      // popover content
      content: "This is popover content",

      // delay times
      delay: { show: 0, hide: 0 },

      // is dismissable
      dismissable: true,

      // top, bottom, left, right
      placement: "bottom",

      // custom theme
      themeName: "default",

      // popover title
      title: "This is popover title",

      // trigger event
      // click | hover | focus | manual
      trigger: "hover",
    });
  });

  const popupNodeID = function (e, id) {
    e.stopPropagation();
    //alert(id);
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

      <button type="button" className="btn btn-primary" id="btnPopover">
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
        <div className="col-12">
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
                  <TreeNode id="1" label="Child 1" onClick={popupNodeID}>
                    <TreeNode
                      id="11"
                      label="Child 11"
                      onClick={popupNodeID}
                    ></TreeNode>
                  </TreeNode>
                  <TreeNode id="2" label="Child 2" onClick={popupNodeID}>
                    <TreeNode
                      id="21"
                      label="Child 21"
                      onClick={popupNodeID}
                    ></TreeNode>
                    <TreeNode
                      id="22"
                      label="Child 22"
                      onClick={popupNodeID}
                    ></TreeNode>
                    <TreeNode label="Child 23" onClick={popupNodeID}></TreeNode>
                  </TreeNode>
                  <TreeNode label="Child 3" onClick={popupNodeID}>
                    <TreeNode label="Child 31" onClick={popupNodeID}></TreeNode>
                    <TreeNode label="Child 32" onClick={popupNodeID}></TreeNode>
                    <TreeNode label="Child 33" onClick={popupNodeID}></TreeNode>
                    <TreeNode label="Child 34" onClick={popupNodeID}></TreeNode>
                    <TreeNode label="Child 35" onClick={popupNodeID}></TreeNode>
                  </TreeNode>
                </Tree>
              </div>
            }
          ></WishSimpleCard>
        </div>
      </div>
    </PageLayout>
  );
}
