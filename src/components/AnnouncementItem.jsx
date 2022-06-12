/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

export default class AnnouncementItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleExpansion = this.handleExpansion.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleExpansion(e) {
    if (e.defaultPrevented) return; // Exits here if event has been handled

    this.setState({ expanded: !this.state.expanded });
  }

  handleLinkClick(e) {
    e.preventDefault();
  }

  render() {
    var today = new Date(),
      currentTime = today.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

    const title = this.props.title === undefined ? "Heading" : this.props.title;
    const icon =
      this.props.icon === undefined ? "la-download" : this.props.icon;
    const time = this.props.time === undefined ? currentTime : this.props.time;
    const addPadding = this.props.addTopPadding === undefined ? false : true;

    return (
      <div
        className={
          "wish-announcement-item row d-flex align-items-center " +
          (addPadding === true ? "pt-2" : "")
        }
        onClick={this.handleExpansion}
      >
        <div className="col">
          <a>
            <h5>{title}</h5>
          </a>
        </div>
        <div className="col-auto text-right">
          <a className="btn btn-outline-primary" onClick={this.handleLinkClick}>
            Download Attachment <i className={"la " + icon}></i>
          </a>
        </div>
        <div className="col-auto text-right">{time}</div>
        <div className="col-12">
          <p
            className={
              this.state.expanded === false ? "collapse-text" : ""
            }
          >
            {this.props.children}
          </p>
        </div>
      </div>
    );
  }
}
