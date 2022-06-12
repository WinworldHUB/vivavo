/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PageSideMenu extends Component {
  render() {
    return (
      <div
        className={
          "main-menu menu-fixed menu-dark menu-accordion menu-shadow" +
            this.props.className ?? " "
        }
        data-scroll-to-active="true"
        data-img="./assets/app-assets/images/backgrounds/04.jpg"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <Link className="navbar-brand" to="/">
                <img
                  className="brand-logo"
                  alt="INDUSVIVA"
                  src="../assets/app-assets/images/ico/apple-touch-icon.png"
                />
                <h3 className="brand-text">INDUSVIVA</h3>
              </Link>
            </li>
            <li className="nav-item d-md-none">
              <a className="nav-link close-navbar" href="#">
                <i className="ft-x"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="navigation-background"></div>
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li
              className={this.props.activeIndex === "1" ? "active" : "nav-item"}
            >
              <Link to="/">
                <i className="la la-home"></i>
                <span className="menu-title" data-i18n="">
                  Dashboard
                </span>
              </Link>
            </li>
            <li
              className={this.props.activeIndex === "2" ? "active" : "nav-item"}
            >
              <Link to="/sales">
                <i className="la la-briefcase"></i>
                <span className="menu-title" data-i18n="">
                  Sales
                </span>
              </Link>
            </li>

            <li
              className={this.props.activeIndex === "3" ? "active" : "nav-item"}
            >
              <Link to="/enrollment">
                <i className="las la-address-card"></i>
                <span className="menu-title" data-i18n="">
                  Enrollment
                </span>
              </Link>
            </li>

            <li
              className={this.props.activeIndex === "4" ? "active" : "nav-item"}
            >
              <Link to="/mygeneology">
                <i className="las la-project-diagram"></i>
                <span className="menu-title" data-i18n="">
                  My Geneology
                </span>
              </Link>
            </li>

            <li
              className={this.props.activeIndex === "5" ? "active" : "nav-item"}
            >
              <Link to="/analysis">
                <i className="las la-chart-bar"></i>
                <span className="menu-title" data-i18n="">
                  Analysis
                </span>
              </Link>
            </li>

            <li
              className={this.props.activeIndex === "6" ? "active" : "nav-item"}
            >
              <Link to="/announcements">
                <i className="las la-bullhorn"></i>
                <span className="menu-title" data-i18n="">
                  Announcements
                </span>
              </Link>
            </li>

            <li
              className={this.props.activeIndex === "7" ? "active" : "nav-item"}
            >
              <Link to="/vmail">
                <i className="las la-envelope"></i>
                <span className="menu-title" data-i18n="">
                  VMail
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
