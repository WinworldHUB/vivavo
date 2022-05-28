/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PageLayout from "../components/PageLayout";
import WishSimpleCard from "../components/WishSimpleCard";

function Header(props) {
  return <h1>This is heading</h1>;
}

export default class TestPage extends Component {
  render() {
    return (
      <PageLayout pageTitle="Test Page">
        <section className="row d-flex justify-content-around">
          <div className="col-4">Col 1</div>
          <div className="col-4">Col 2</div>
          <div className="col-4">Col 3</div>
          <div className="col-4">Col 4</div>
          <div className="col-4">Col 5</div>
        </section>

        <WishSimpleCard header={Header()}></WishSimpleCard>
        
      </PageLayout>
    );
  }
}
