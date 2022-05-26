import React, { Component } from "react";
import PageLayout from "../components/PageLayout";

export default class MyGeneology extends Component {
  render() {
    return (
      <PageLayout activeSideMenu="4" pageTitle="My Geneology">
        <section className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3>My Geneology Content Placeholder</h3>
                <br />
                <p className="lead">
                  This is dashboard content placeholder. Dashboard content will
                  go here.
                </p>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }
}
