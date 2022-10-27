import React from "react";
import PageLayout from "../components/PageLayout";
import pageConfig from "../data/config.json";
import WishSimpleCard from "../components/WishSimpleCard";
import WishFlexBox from "../components/WishFlexBox";
import { useState } from "react";
import useMasters from "../services/useMasters";
import { useEffect } from "react";
import moment from "moment";

export default function Notifications() {
  const { loggedInUser, getNotifications } = useMasters();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      getNotifications(loggedInUser?.distributor_id, setNotifications);
    }
  }, [loggedInUser]);

  const isNoficationValid = (notification) => {
    const dateFrom = new Date(notification?.valid_from);
    const dateTo = new Date(notification?.valid_upto);
    const today = new Date();

    return dateFrom <= today && today <= dateTo;
  };

  return (
    <PageLayout {...pageConfig.notificationsDashboard}>
      <div className="row">
        <div className="col-12">
          <WishSimpleCard>
            <ul className="list-group list-group-flush">
              {notifications.map((notification) => {
                if (isNoficationValid(notification)) {
                  return (
                    <li className="list-group-item py-0 px-2 pt-1 trackable" key={notification.id}>
                      <WishFlexBox>
                        <p>
                          <i className="las la-bell la-2x"></i>
                          <span
                            className="pl-1 pt-1"
                            style={{ lineHeight: "1.3" }}
                          >
                            <strong>{notification.body}</strong>
                          </span>
                        </p>
                        <small className="d-block text-right">
                          {moment(notification.valid_from)
                            .startOf("day")
                            .fromNow()}
                        </small>
                      </WishFlexBox>
                    </li>
                  );
                }

                return <></>;
              })}
            </ul>
          </WishSimpleCard>
        </div>
      </div>
    </PageLayout>
  );
}
