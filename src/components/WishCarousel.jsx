/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default class WishCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: null,
      currentPage: 0,
      totalPages: React.Children.count(this.props.children) - 1,
    };
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.finishButton = this.finishButton.bind(this);
    this.componentId = uuidv4();

    //console.log(this.state.totalPages);
  }

  handleNavigation(direction) {
    var pageIndex = this.state.currentPage;
    if (direction === "next") {
      this.state.slider.trigger("next.owl.carousel");
      this.setState({ currentPage: pageIndex + 1 });
    } else if (direction === "prev") {
      this.state.slider.trigger("prev.owl.carousel");
      this.setState({ currentPage: pageIndex - 1 });
    }

    //console.log(this.state.totalPages);
    if (this.props.onNavidation !== undefined)
      this.props.onNavigation(
        direction,
        this.state.currentPage,
        this.state.totalPages
      );
  }

  handleFinish() {
    if (this.props.onFinish !== undefined) {
      console.log("Triggerring OnFinish");
      this.props.onFinish();
    }
  }

  componentDidMount() {
    this.setState({
      totalPages: $("#" + this.componentId + " .item").length - 1,
    });

    this.setState({
      slider: $("#" + this.componentId).owlCarousel({
        autoHeight: true,
        margin: 10,
        items: 1,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: false,
        callbacks: true,
        info: true,
      }),
    });
  }

  refreshCarousel() {
    this.state.slider.trigger("refresh.owl.carousel");
    console.log("Called");
  }

  finishButton() {
    if (this.props.finishTo !== undefined) {
      const finishState =
        this.props.finishToState === undefined ? "" : this.props.finishToState;
      return (
        <Link
          to={this.props.finishTo}
          state={finishState}
          className={
            "btn btn-primary " +
            (this.state.currentPage < this.state.totalPages ? "d-none" : "")
          }
        >
          Submit
        </Link>
      );
    } else if (this.props.onFinish !== undefined) {
      return (
        <button
          component={Link}
          className={
            "btn btn-primary " +
            (this.state.currentPage < this.state.totalPages ? "d-none" : "")
          }
          onClick={this.handleFinish}
        >
          Submit
        </button>
      );
    }
  }

  render() {
    const hasTitle =
      this.props.title === undefined || this.props.title === "" ? false : true;

    // const finishTarget =
    //   this.props.finishTo === undefined ? "" : this.props.finishTo;

    return (
      <div className="card">
        <div className={"card-header" + (hasTitle === true ? "" : "d-none")}>
          <h3>{this.props.title}</h3>
        </div>
        <div className="card-body">
          <div className="owl-carousel owl-theme" id={this.componentId}>
            {this.props.children}
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            className={
              "btn btn-link " + (this.state.currentPage === 0 ? "d-none" : "")
            }
            onClick={() => this.handleNavigation("prev")}
          >
            Previous
          </button>
          <button
            className={
              "btn btn-link " +
              (this.state.currentPage === 0 ? "ml-auto" : "") +
              (this.state.currentPage === this.state.totalPages ? "d-none" : "")
            }
            onClick={() => this.handleNavigation("next")}
          >
            Next
          </button>
          {/* <button
            className={
              "btn btn-primary " +
              (this.state.currentPage < this.state.totalPages ? "d-none" : "")
            }
            onClick={this.handleFinish}
          >
            Submit
          </button> */}

          <this.finishButton />
        </div>
      </div>
    );
  }
}
