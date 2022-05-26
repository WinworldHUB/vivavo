import React, { Component } from "react";
import PageLayout from "../components/PageLayout";

export default class VMail extends Component {
  render() {
    return (
      <PageLayout activeSideMenu="7" pageTitle="VMail">
        <section className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3>VMail Content Placeholder</h3>
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
