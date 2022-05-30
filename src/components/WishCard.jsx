import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class WishCard extends Component {
  render() {
    const cardTextColor = this.props.textWhite === true ? " text-white " : "";

    const cardBackground =
      this.props.bgColor === "" || this.props.bgColor === undefined
        ? " box-shadow-0 onhover-shadow onhover-change-border"
        : " box-shadow-3 onhover-change-border " +
          this.props.bgColor +
          " " +
          cardTextColor;

    const cardLinkTitle =
      this.props.linkToTitle === "" || this.props.linkToTitle === undefined
        ? "PROCEED"
        : this.props.linkToTitle.toUpperCase();

    const cardLinkIcon =
      this.props.linkToIcon === "" || this.props.linkToIcon === undefined
        ? "la-angle-right"
        : this.props.linkToIcon;

    const cardIcon =
      this.props.icon === "" || this.props.icon === undefined
        ? ""
        : this.props.icon;

    return (
      <div className={"card" + cardBackground}>
        <div className="card-content collapse show">
          <div className="card-body row">
            <div className="col-10">
              <h4 className={"card-title " + cardTextColor}>
                {this.props.title}
              </h4>
            </div>
            <div className="col-2 text-right">
              <i className={"la " + cardIcon}></i>
            </div>

            <div className="col-12">
              <p className="card-text" key="{line}">
                {this.props.line1} <br />
                {this.props.line2}
              </p>
            </div>
          </div>
          <div className="card-footer border-top-lighten-5 text-right">
            <Link
              to={this.props.linkTo === undefined ? "" : this.props.linkTo}
              state={this.props.linkToState ?? {}}
              className={"card-link " + cardTextColor}
              data-toggle="modal"
              data-target={this.props.linkToModal ?? ""}
              data-keyboard={this.props.modalDisableKeyboard ?? "true"}
              data-backdrop={this.props.modalStaticBackground ?? "non-static"}
            >
              {cardLinkTitle}
              <i className={"la " + cardLinkIcon}></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
