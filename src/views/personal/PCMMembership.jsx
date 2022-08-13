/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";

export default function PCMMembership(props) {
  const [availed, setAvailed] = React.useState(false);
  const [affidavit, setAffidavit] = React.useState();
  const [affidavits, addAffidavit] = React.useState([]);

  const handleUploadAffidavit = () => {
    if (affidavit !== null) {
      addAffidavit([...affidavits, affidavit]);
    }
  };

  const Header = () => {
    return <h3>PCM Membership Details</h3>;
  };

  const Body = () => {
    return (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sem
          turpis, luctus rhoncus elit pellentesque, suscipit consequat nisi.
          Donec dignissim magna quis felis consequat luctus. Phasellus bibendum
          lobortis mauris sit amet posuere. Suspendisse gravida odio at neque
          fermentum finibus. Praesent gravida, eros aliquam mattis tempus, diam
          neque aliquet turpis, id lacinia ligula orci gravida odio. Vestibulum
          in imperdiet nisi. Nunc mollis interdum tellus, non faucibus neque
          elementum non. Curabitur accumsan ultrices molestie. Sed interdum
          posuere tristique. Morbi dapibus turpis quis tempus blandit.
        </p>
        <div
          className="modal fade"
          tabIndex="-1"
          role="dialog"
          id="dlgVOTMMembershipDocument"
          data-bs-keyboard="false"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Affidavit</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group row align-items-center">
                  <label htmlFor="txtAffidavitFile" className="col-sm-2">
                    Affidavit
                  </label>
                  <div className="col-sm-6">
                    <input
                      id="txtAffidavitFile"
                      name="txtAffidavitFile"
                      type="file"
                      className="form-control hidden"
                      required="required"
                      onChange={(e) => setAffidavit(e.target.files[0].name)}
                    />

                    <input
                      id="txtAffidavit"
                      name="txtAffidavit"
                      type="text"
                      className="form-control"
                      readOnly="readonly"
                      value={affidavit ?? ""}
                    />
                  </div>

                  <div className="col-sm-4 text-right pt-1 pt-sm-0">
                    <label
                      className="btn btn-secondary btn-block"
                      htmlFor="txtAffidavitFile"
                    >
                      Choose Document
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => handleUploadAffidavit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const Footer = () => {
    return (
      <button
        className="btn btn-primary"
        data-target="#dlgVOTMMembershipDocument"
        data-toggle="modal"
        data-backdrop="false"
        data-keyboard="false"
        onClick={() => {
          setAffidavit();
        }}
      >
        Avail Membership
      </button>
    );
  };

  const PlaceVOTMOrderBody = () => {
    return (
      <div className="d-flex justify-content-between">
        <h5 className="pt-1">Place PCM order to become a PCM member</h5>
        <Link to="/myprofile" className="btn btn-primary">
          Place Order
        </Link>
      </div>
    );
  };

  const TableBody = () => {
    return (
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Affidavit</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {affidavits
            .slice(0)
            .reverse()
            .map((title, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <a onClick={() => setAvailed(!availed)}>View</a> ({title})
                  </td>
                  <td>{availed ? "availed" : "pending"}</td>
                  <td>
                    {new Date().toLocaleString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  };

  return (
    <PageLayout activeSideMenu="0" pageTitle="PCM Membership">
      <section className="row">
        <div className="col-12">
          <WishSimpleCard
            header={Header()}
            body={Body()}
            footer={Footer()}
          ></WishSimpleCard>
        </div>
        <div className="col-12">
          <WishSimpleCard
            body={availed && PlaceVOTMOrderBody()}
          ></WishSimpleCard>
        </div>
        <div className="col-12">
          <WishSimpleCard
            body={affidavits.length > 0 && TableBody()}
          ></WishSimpleCard>
        </div>
      </section>
    </PageLayout>
  );
}
