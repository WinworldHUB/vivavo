/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishCard from "../../components/WishCard";
import WishModal from "../../components/WishModal";
import WishToaster from "../../components/WishToaster";

export default function Sales() {
  return (
    <PageLayout activeSideMenu="2" pageTitle="Sales Dashboard" header="OPTIONS">
      <section className="row">
        <div className="col-md-4 col-sm-6">
          <WishCard
            bgColor="bg-primary"
            textWhite
            icon="la-cart-plus"
            title="Place Order"
            line1="New orders can be placed using this option."
            line2={[
              "Please check your ",
              <code>Daily PV Limit</code>,
              " before placing new orders.",
            ]}
            linkTo="/placeorder"
            linkToState={{ typeOfOrder: 0 }}
          ></WishCard>
        </div>

        {/* <div className="col-md-4 col-sm-6">
          <WishCard
            title="PCM"
            icon="la-crown"
            line1="A prestigeous recognition from Indusviva family."
            line2={[
              "Checkout the list of ",
              <code>Presidential Club Members</code>,
              " here.",
            ]}
            linkTo="/placeorder"
            linkToState={{ typeOfOrder: 2 }}
          ></WishCard>
        </div>

        <div className="col-md-4 col-sm-6">
          <WishCard
            title="VOTM"
            icon="la-shuttle-van"
            line1="Indusviva on the move scheme allows selling products
                    from home or vehicle."
            line2={[
              "You can manage your ",
              <code>VOTM Sales</code>,
              " from here.",
            ]}
            linkTo="/placeorder"
            linkToState={{ typeOfOrder: 1 }}
          ></WishCard>
        </div> 
      </section>

      <section className="row">*/}
        <div className="col-md-4 col-sm-6">
          <WishCard
            title="My Orders"
            icon="la-list-alt"
            line1="Know status of your orders using this option."
            line2={[
              "You can also ",
              <code>make payments</code>,
              " for pending orders from here.",
            ]}
            linkTo="/myorders"
          ></WishCard>
        </div>

        <div className="col-md-4 col-sm-6">
          <WishCard
            title="Store Link"
            icon="la-link"
            line1="Generate and share your store link with your
                    customers."
            line2={[
              "Copy Store Link ",
              <code>store link</code>,
              " to clipboard and share ",
              <code>with customers</code>,
              " from here.",
            ]}
            linkToTitle="Copy Link"
            linkToModal="#dlgGetLink"
          ></WishCard>
        </div>

        <div className="col-md-4 col-sm-6"></div>
      </section>
      <WishModal
        id="dlgGetLink"
        title="Get Link"
        hideCancelButton={true}
        finishTitle="Copy Link"
        modalSize="modal-lg"
        onFinish={() =>
          WishToaster({
            toastMessage: "Link copied to clipboard!",
            toastType: "success",
          })
        }
      >
        <div className="form-group row">
          <div className="col-12">
            <div className="input-group">
              <input
                id="txtStoreLink"
                name="txtStoreLink"
                type="text"
                className="form-control"
                defaultValue="https://vo.indusviva.com/sales/storelink/54asfadf4fa5a"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <Link to="">
                    <i className="las la-sync"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <span className="align-middle">
            <i className="lab la-2x la-whatsapp"></i>
          </span>
          <span className="align-middle">
            {" "}
            Send to your registered mobile number <code>+91-9009200920</code>
          </span>
          <span className="pl-2">
            <button className="btn btn-primary btn-sm" data-dismiss="modal">Share</button>
          </span>
        </div>
      </WishModal>
    </PageLayout>
  );
}
