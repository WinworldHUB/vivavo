import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import WishToaster from "../components/WishToaster";
import useDashboard from "../services/useDashboard";
import useMaster from "../services/useMasters";

export default function Dashboard() {
  const { loggedInUser } = useMaster();
  const [dashboardError] = useDashboard(loggedInUser);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (dashboardError) {
      WishToaster({ toastMessage: dashboardError });
    }
  }, [dashboardError]);

  const RenderPage = function () {
    return (
      <PageLayout activeSideMenu="1" pageTitle="Dashboard">
        <section className="row">
          <div className="col-12">
            <div className="card">
              {loggedInUser?.distributor_id ? (
                <div className="card-body">
                  <h3>Dashboard Content Placeholder</h3>
                  <br />
                  <p className="lead">
                    This is dashboard content placeholder. Dashboard content
                    will go here.
                  </p>
                </div>
              ) : (
                <div className="card-body">
                  <h3>Please login to proceed</h3>
                  <br />
                  <p className="lead">
                    This is dashboard content placeholder. Dashboard content
                    will go here.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-12" id="carouselDiv"></div>
        </section>
      </PageLayout>
    );
  };

  return <RenderPage />;
}
