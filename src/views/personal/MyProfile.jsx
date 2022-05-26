import React, { Component } from "react";
import PageLayout from "../../components/PageLayout";
import WishCard from "../../components/WishCard";

export default class MyProfile extends Component {
  render() {
    return (
      <PageLayout activeSideMenu="0" pageTitle="My Profile">
        <section className="row">
          <div className="col-md-4 col-sm-6">
            <WishCard
              bgColor="bg-primary"
              textWhite
              icon="la-user-tie"
              title="Distributor Profile"
              line1="Manage your distribution related profile using this option."
              line2={[
                "You can manage you ",
                <code>organization related</code>,
                " details from here.",
              ]}
              linkTo="/distributorprofile"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="Co-Applicant Profile"
              icon="la-user-friends"
              line1="Manage your co-applicant related information using this option."
              line2={[
                "You can manage your ",
                <code>Co-Applicant details</code>,
                " from here.",
              ]}
              linkTo="/coapplicantprofile"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="KYC"
              icon="la-id-card-alt"
              line1="All your KYC related information can be managed using this option."
              line2={[
                "Manage your all your personal ",
                <code>KYC documents</code>,
                " from here.",
              ]}
              linkTo="/kyc"
            ></WishCard>
          </div>
          <div className="col-md-4 col-sm-6">
            <WishCard
              title="My Cards"
              icon="la-id-card"
              line1="Your organizational related letters and cards can be managed using this option."
              line2={[
                "You can manage your ",
                <code>organizational letters</code>,
                " and ",
                <code>cards</code>,
                " from here.",
              ]}
              linkTo="/mycards"
            ></WishCard>
          </div>
          <div className="col-md-4 col-sm-6">
            <WishCard
              title="PCM Membership"
              icon="la-crown"
              line1="Know status of your orders using this option."
              line2={[
                "You can also <code>make payments ",
                <code>make payments</code>,
                " for pending orders from here.",
              ]}
              linkTo="/pcmmembership"
            ></WishCard>
          </div>
          <div className="col-md-4 col-sm-6">
            <WishCard
              title="VOTM Membership"
              icon="la-shuttle-van"
              line1="Know status of your orders using this option."
              line2={[
                "You can also <code>make payments ",
                <code>make payments</code>,
                " for pending orders from here.",
              ]}
              linkTo="/votmmembership"
            ></WishCard>
          </div>
        </section>
      </PageLayout>
    );
  }
}
