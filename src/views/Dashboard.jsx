/* eslint-disable no-undef */
import React, { Component } from "react";
import PageLayout from "../components/PageLayout";

export default class Dashboard extends Component {
  carouselResize() {
    console.log("resize called");
  }

  showToast() {
    toastr.warning("Have fun storming the castle!", "Progress Bar", {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    });
  }

  render() {
    return (
      <PageLayout activeSideMenu="1" pageTitle="Dashboard">
        <section className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h3>Dashboard Content Placeholder</h3>
                <br />
                <p className="lead">
                  This is dashboard content placeholder. Dashboard content will
                  go here.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12" id="carouselDiv">
            
          </div>
        </section>
      </PageLayout>
    );
  }
}
