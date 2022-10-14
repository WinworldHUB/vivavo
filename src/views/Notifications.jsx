import React from "react";
import PageLayout from "../components/PageLayout";
import pageConfig from "../data/config.json";
import WishSimpleCard from "../components/WishSimpleCard";
import WishFlexBox from "../components/WishFlexBox";

export default function Notifications() {
  return (
    <PageLayout {...pageConfig.notificationsDashboard}>
      <div className="row">
        <div className="col-12">
          <WishSimpleCard>
            <ul className="list-group list-group-flush">
              <li className="list-group-item py-0 px-2 trackable">
                <WishFlexBox justifyContent="start">
                  <i className="las la-bell la-2x"></i>
                  <p className="pl-1 pt-1" style={{ lineHeight: "1.3" }}>
                    <strong className="d-block">
                      Week 222 commission report available
                    </strong>
                  </p>
                  <small className="ml-auto text-right">3 hours ago</small>
                </WishFlexBox>
              </li>
              <li className="list-group-item py-0 px-2 trackable">
                <WishFlexBox justifyContent="start">
                  <i className="las la-bell la-2x"></i>
                  <p className="pl-1 pt-1" style={{ lineHeight: "1.3" }}>
                    <strong className="d-block">
                      Kindly complete your KYC
                    </strong>
                  </p>
                  <small className="ml-auto text-right">2 days ago</small>
                </WishFlexBox>
              </li>
              <li className="list-group-item py-0 px-2 trackable">
                <WishFlexBox justifyContent="start">
                  <i className="las la-thumbs-up la-2x"></i>
                  <p className="pl-1 pt-1" style={{ lineHeight: "1.3" }}>
                    <strong className="d-block">
                      Congratulations you have achieved your new rank
                    </strong>
                  </p>
                  <small className="ml-auto text-right">3 days ago</small>
                </WishFlexBox>
              </li>
              <li className="list-group-item py-0 px-2 trackable">
                <WishFlexBox justifyContent="start">
                  <i className="las la-bell la-2x"></i>
                  <p className="pl-1 pt-1" style={{ lineHeight: "1.3" }}>
                    <strong className="d-block">
                      Week 222 commission report available
                    </strong>
                  </p>
                  <small className="ml-auto text-right">2 October 2022</small>
                </WishFlexBox>
              </li>
              <li className="list-group-item py-0 px-2 trackable">
                <WishFlexBox justifyContent="start">
                  <i className="las la-bell la-2x"></i>
                  <p className="pl-1 pt-1" style={{ lineHeight: "1.3" }}>
                    <strong className="d-block">
                      Kindly complete your KYC
                    </strong>
                  </p>
                  <small className="ml-auto  text-right">
                    21 February 2022
                  </small>
                </WishFlexBox>
              </li>
            </ul>
          </WishSimpleCard>
        </div>
      </div>
    </PageLayout>
  );
}
