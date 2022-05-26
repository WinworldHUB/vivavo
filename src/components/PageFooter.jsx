import React, { Component } from "react";

export default class PageFooter extends Component {
  render() {
    return (
      <footer className="footer footer-static fixed-bottom footer-light navbar-border navbar-shadow">
        <div className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
          <span className="float-md-left d-block d-md-inline-block">
            2022 &copy; Copyright &nbsp;
            <a
              className="text-bold-800 grey darken-2"
              href="https://Indusviva.com"
              target="_blank"
              rel="noreferrer"
            >
              Indusviva
            </a>
          </span>
          <ul className="list-inline float-md-right d-block d-md-inline-blockd-none d-lg-block mb-0">
            <li className="list-inline-item">
              <a className="my-1" href="coming-soon.html" target="_blank">
                {" "}
                FAQ
              </a>
            </li>
            <li className="list-inline-item">
              <a className="my-1" href="coming-soon.html" target="_blank">
                {" "}
                HELP
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
