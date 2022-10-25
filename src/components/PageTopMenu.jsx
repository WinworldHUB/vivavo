/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WishFlexBox from "./WishFlexBox";
import MediaQuery from "@kokojer/react-responsive";
import useAuthentication from "../services/useAuthentication";
import { SUCCESS, ERROR, NOTIFICATIONS_LIMIT } from "../services/Constants";
import useNotificationModal from "./useNotificationModal";
import NotificationModal from "../components/NotificationModal";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import useMasters from "../services/useMasters";
import { useState } from "react";
import moment from "moment";

export default function PageTopMenu({ className = "", pageTitle = "" }) {
  const { loggedInUser, getNotifications } = useMasters();
  const navigateTo = useNavigate();
  const [logoutResponse, logoutError, { logout }] = useAuthentication();
  const [distributor, setDistributor] = useLocalStorage("distributor", "");
  const [notifications, setNotifications] = useState([]);
  const [showNotification, notificationMessage, { toggle, updateMessage }] =
    useNotificationModal();

  useEffect(() => {
    if (loggedInUser) {
      getNotifications(loggedInUser?.distributor_id, (data) => {
        const dataArray = Array.from(data);
        if (dataArray.length <= 5) {
          setNotifications(dataArray);
        } else {
          setNotifications(dataArray.slice(0, NOTIFICATIONS_LIMIT));
        }
      });
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (logoutResponse) {
      setDistributor("");
      navigateTo("/signin");
    }
  }, [logoutResponse]);

  const isNoficationValid = (notification) => {
    const dateFrom = new Date(notification?.valid_from);
    const dateTo = new Date(notification?.valid_upto);
    const today = new Date();

    return dateFrom <= today && today <= dateTo;
  };

  const logoutUser = () => {
    if (distributor === "") {
      navigateTo("/signin");
    } else {
      const distributorDetails = JSON.parse(distributor);

      if (distributorDetails.distributor_id === "") {
        navigateTo("/signin");
      } else {
        const credentials = {
          user_name: distributorDetails.distributor_id,
          isReadyToAuthenticate: true,
        };

        logout(credentials);
      }
    }
  };

  const RenderNotifications = function () {
    return (
      <div className="arrow_box_right">
        <ul className="list-group list-group-flush">
          {notifications.map((notification) => {
            if (isNoficationValid(notification)) {
              return (
                <li className="list-group-item py-0 px-2 trackable">
                  <WishFlexBox justifyContent="start">
                    <i className="las la-bell la-2x"></i>
                    <p className="pl-1 pt-1" style={{ lineHeight: "1.3" }}>
                      <strong className="d-block">{notification.body}</strong>
                      <small className="d-block">
                        {moment(notification.valid_from)
                          .startOf("day")
                          .fromNow()}
                      </small>
                    </p>
                  </WishFlexBox>
                </li>
              );
            }

            return <></>;
          })}
        </ul>

        <div
          className="text-center dropdown-item clickable bg-light pt-1"
          onClick={() => {
            navigateTo("/notifications");
          }}
        >
          <label className="clickable underlined">
            <strong>View all</strong>
          </label>
        </div>
      </div>
    );
  };

  return (
    <nav
      className={
        "header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light " +
        (className ?? " ")
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
                <a className="nav-link">{pageTitle}</a>
              </li>
              <li className="dropdown dropdown-user nav-item">
                <a
                  className="dropdown-toggle nav-link dropdown-user-link"
                  data-toggle="dropdown"
                >
                  <span className="avatar avatar-online">
                    <img
                      src="../assets/app-assets/images/portrait/small/Bell.png"
                      alt="avatar"
                    />
                  </span>
                </a>
                <MediaQuery minWidth={420}>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    id="mnuNotifications"
                    style={{ minWidth: "420px" }}
                  >
                    {notifications.length > 0 && <RenderNotifications />}
                  </div>
                </MediaQuery>
                <MediaQuery maxWidth={420}>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    id="mnuNotifications"
                  >
                    <RenderNotifications />
                  </div>
                </MediaQuery>
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
                    <a className="dropdown-item clickable" onClick={logoutUser}>
                      <i className="ft-log-out"></i> Signout / Switch Account
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <NotificationModal
        isShowing={showNotification}
        message={notificationMessage}
      />
    </nav>
  );
}
