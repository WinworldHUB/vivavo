import React, { Component } from "react";
import PageLayout from "../../components/PageLayout";
import WishCard from "../../components/WishCard";

export default class Sales extends Component {
  render() {
    return (
      <PageLayout
        activeSideMenu="2"
        pageTitle="Sales Dashboard"
        header="OPTIONS"
      >
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
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="PCM"
              icon="la-crown"
              line1="A prestigeous recognition from Indusviva family."
              line2={[
                "Checkout the list of ",
                <code>Presidential Club Members</code>,
                " here.",
              ]}
              linkTo="/"
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
              linkTo="/"
            ></WishCard>
          </div>
        </section>

        <section className="row">
          <div className="col-md-4 col-sm-6">
            <WishCard
              title="My Orders"
              icon="la-list-alt"
              line1="Know status of your orders using this option."
              line2={[
                "You can also <code>make payments ",
                <code>make payments</code>,
                " for pending orders from here.",
              ]}
              linkTo="/"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="Store Link"
              icon="la-link"
              line1="Generate and share your store link with your
                    customers."
              line2={[
                "Copy <code>Store Link ",
                <code>store link</code>,
                " to clipboard and share ",
                <code>with customers</code>,
                " from here.",
              ]}
              linkToTitle="Copy Link"
              linkTo="/"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6"></div>
        </section>
      </PageLayout>
    );
  }
}
