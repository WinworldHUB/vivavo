/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PageLayout from "../components/PageLayout";
import WishModal from "../components/WishModal";
import WishSimpleCard from "../components/WishSimpleCard";
import WishToaster from "../components/WishToaster";

function Header(props) {
  return <h1>This is heading</h1>;
}

export default function TestPage() {
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
      <WishModal infoMode={"Loading ..."}></WishModal>
      <button
        id="login"
        className="btn btn-primary"
        onClick={() =>
          WishToaster({
            toastMessage: "Some message",
            toastType: "success",
          })
        }
      >
        Show Toast
      </button>
    </PageLayout>
  );
}
