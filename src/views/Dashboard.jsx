import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import useDashboard from "../services/useDashboard";

export default function Dashboard() {
  const dashboard = useDashboard();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!dashboard.isUserAuthenticated) {
      navigateTo("/signin");
    }
  }, []);

  const RenderPage = function () {
    return (
      <PageLayout activeSideMenu="1" pageTitle="Dashboard">
        <section className="row">
          <div className="col-12">
            <div className="card">
              {dashboard.isUserAuthenticated ? (
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
