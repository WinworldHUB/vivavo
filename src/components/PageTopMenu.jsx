/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PageTopMenu extends Component {
  render() {
    return (
      <nav
        className={
          "header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light " +
          (this.props.className ?? " ")
        }
      >
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div className="collapse navbar-collapse show" id="navbar-mobile">
              <ul className="nav navbar-nav mr-auto float-left">
                <li className="nav-item mobile-menu d-md-none mr-auto">
                  <a
                    className="nav-link nav-menu-main menu-toggle hidden-xs"
                    href="#"
                  >
                    <i className="ft-menu font-large-1"></i>
                  </a>
                </li>
                <li className="nav-item d-none d-md-block">
                  <a
                    className="nav-link nav-menu-main menu-toggle hidden-xs"
                    href="#"
                  >
                    <i className="ft-menu"></i>
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav float-right">
                <li className="dropdown dropdown-language nav-item">
                  <a className="nav-link">{this.props.pageTitle}</a>
                </li>
                <li className="dropdown dropdown-user nav-item">
                  <a
                    className="dropdown-toggle nav-link dropdown-user-link"
                    data-toggle="dropdown"
                  >
                    <span className="avatar avatar-online">
                      <img
                        src="../assets/app-assets/images/portrait/small/avatar-s-19.png"
                        alt="avatar"
                      />
                    </span>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    id="topMenuDropDown"
                  >
                    <div className="arrow_box_right">
                      <Link className="dropdown-item" to="/myprofile">
                        <span className="avatar avatar-online">
                          <img
                            src="./assets/app-assets/images/portrait/small/avatar-s-19.png"
                            alt="avatar"
                          />
                          <span className="user-name text-bold-700 ml-1">
                            John Doe (1001)
                          </span>
                        </span>
                      </Link>
                      <div className="pl-2">
                        <small>Black Diamond Ambassador</small>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/myprofile">
                        <i className="ft-user"></i> My Profile
                      </Link>

                      <Link className="dropdown-item" to="/wallet">
                        <i className="ft-credit-card"></i> Wallet
                        <span className="badge bg-primary float-right ptm-1">
                          Rs. 11,654
                        </span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to="/settings">
                        <i className="ft-settings"></i> Settings
                      </Link>
                      <Link className="dropdown-item" to="/signin">
                        <i className="ft-log-out"></i> Signout / Switch Account
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
