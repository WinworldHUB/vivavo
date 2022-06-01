/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageFooter from "./PageFooter.jsx";
import PageSideMenu from "./PageSideMenu.jsx";
import PageTopMenu from "./PageTopMenu.jsx";

export default class PageLayout extends Component {
  componentDidMount(props) {
    var isNormalPage =
      this.props.isAuthentication === undefined
        ? true
        : !this.props.isAuthentication;

    if (isNormalPage === false) {
      // Remove all the normal page classes
      document.body.classList.remove("2-columns");
      document.body.classList.remove("pace-done");
      document.body.classList.remove("menu-expanded");
      document.body.classList.remove("fixed-navbar");

      // Add authentication page classes
      document.body.classList.add("1-column");
      document.body.classList.add("bg-full-screen-image");
      document.body.classList.add("blank-page");
      document.body.dataset.col = "1-column";
    } else {
      // Remove all the normal page classes
      document.body.classList.add("2-columns");
      document.body.classList.add("pace-done");
      document.body.classList.add("menu-expanded");
      document.body.classList.add("fixed-navbar");
      document.body.dataset.col = "2-columns";

      // Add authentication page classes
      document.body.classList.remove("1-column");
      document.body.classList.remove("bg-full-screen-image");
      document.body.classList.remove("blank-page");
    }
  }

  render() {
    if (this.props.isAuthentication === true) {
      return (
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-wrapper-before"></div>
            <div className="content-header row"></div>
            <div className="content-body">{this.props.children ?? ""}</div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <PageTopMenu pageTitle={this.props.pageTitle ?? ""}></PageTopMenu>
          <PageSideMenu
            activeIndex={this.props.activeSideMenu ?? 0}
          ></PageSideMenu>
          <div className="app-content content pb-5">
            <div className="content-wrapper">
              <div
                className={
                  "content-wrapper-before " +
                  (this.props.extendedHeader && "extended")
                }
              ></div>
              {(this.props.header || this.props.breadcrumb) &&
                ContentHeader(this.props)}
              <div className="content-body">{this.props.children ?? ""}</div>
            </div>
          </div>
          <PageFooter></PageFooter>
        </>
      );
    }
  }
}

function ContentHeader(props) {
  return (
    <div className="content-header-left row">
      <div className="col">
        <h3 className="content-header-title">{props.header}</h3>
      </div>
      <div className="col-auto text-right">
        <div className="breadcrumb-wrapper mr-1">
          <ol className="breadcrumb">
            {props.breadcrumbs &&
              props.breadcrumbs.map((breadcrumb, index) => {
                if (index < props.breadcrumbs.length - 1) {
                  return (
                    <li className="breadcrumb-item">
                      <Link to={breadcrumb.linkTo}>{breadcrumb.title}</Link>
                    </li>
                  );
                } else {
                  return (
                    <li className="breadcrumb-item active">{breadcrumb.title}</li>
                  );
                }
              })}
            {/* <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Sales</a>
            </li>
            <li className="breadcrumb-item active">Place Order</li> */}
          </ol>
        </div>
      </div>
    </div>
  );
}
