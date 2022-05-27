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
                  {/* <button
                    type="button"
                    className="btn btn-lg btn-block btn-primary mb-2"
                    id="progress-bar"
                    onClick={() => {
                      this.showToast();
                    }}
                  >
                    Show Toast
                  </button> */}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12" id="carouselDiv">
            <div
              id="carouselExampleFade"
              className="carousel slide carousel-slide"
            >
              <div className="carousel-inner wish-mh-200">
                <div className="carousel-item active wish-mh-200">
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                      <small id="emailHelp" class="form-text text-muted">
                        We'll never share your email with anyone else.
                      </small>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="exampleCheck1"
                      />
                      <label class="form-check-label" for="exampleCheck1">
                        Check me out
                      </label>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
                <div className="carousel-item wish-mh-200">
                  <h1>This is 2</h1>
                </div>
                <div className="carousel-item wish-mh-200">
                  <h1>This is 3</h1>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleFade"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleFade"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }
}
