/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PageLayout from "../components/PageLayout";
import WishFlipCard from "../components/WishFlipCard";
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

      <div className="row">
        <div className="col-6">
          <WishFlipCard showBackFooter>
            {{
              frontHeader: "This is front",
              backHeader: "This is back header",
              front: (
                <div className="row">
                  <div className="col-5">Date of birth:</div>
                  <div className="col-7">
                    <strong>01-Jan-1980</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Preferred Language:</div>
                  <div className="col-7">
                    <strong>English</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Gender:</div>
                  <div className="col-7">
                    <strong>Male</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Maritial Status:</div>
                  <div className="col-7">
                    <strong>Married</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Profession:</div>
                  <div className="col-7">
                    <strong>Businessmen</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Monthly Income:</div>
                  <div className="col-7">
                    <strong>Less than 5000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Aadhar Card:</div>
                  <div className="col-7">
                    <strong>0000 0000 0000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Pancard:</div>
                  <div className="col-7">
                    <strong>00000 00000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">GST Number:</div>
                  <div className="col-7">
                    <strong>0000 0000 0000</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Nominee:</div>
                  <div className="col-7">
                    <strong>Shri Gajanan Maharaj</strong>
                  </div>
                  <div className="col-12 pt-1"></div>
                  <div className="col-5">Nominee Relatioship:</div>
                  <div className="col-7">
                    <strong>Father</strong>
                  </div>
                </div>
              ),
              back: "This is back",
            }}
          </WishFlipCard>
        </div>
        <div className="col-6">
          <WishFlipCard>
            {{
              front: "This is front",
              back: "This is back",
            }}
          </WishFlipCard>
        </div>
      </div>
    </PageLayout>
  );
}
