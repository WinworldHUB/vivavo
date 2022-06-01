import React, { Component } from "react";
import PageLayout from "../../components/PageLayout";
import WishCard from "../../components/WishCard";

export default class Enrollment extends Component {
  render() {
    return (
      <PageLayout activeSideMenu="3" pageTitle="Enrollments" header="OPTIONS">
        <section className="row">
          <div className="col-md-4 col-sm-6">
            <WishCard
              bgColor="bg-primary"
              textWhite={true}
              title="Enroll New User"
              icon="la-user-plus"
              line1="New users can be enrolled into the system using this
                    option."
              line2={[
                "Please provide ",
                <code>new user details</code>,
                " to enroll him/her into the system.",
              ]}
              linkTo="/enrolluser"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              bgColor="bg-primary bg-lighten-4 box-shadow-0 onhover-shadow onhover-change-border"
              title="On-going Enrollments"
              icon="la-user-friends"
              line1="View past incomplete enrollments and submit them using
                    this option."
              line2={[
                "You can also remove ",
                <code>existing</code>,
                " enrollments or start afresh.",
              ]}
              linkTo="/"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="Generate Link"
              icon="la-link"
              line1="Generate and share link to users for online
                    enrollment."
              line2={[
                "You can also share ",
                <code>QR Code</code>,
                " for doing mobile based enrollment.",
              ]}
              linkTo="/"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6"></div>
        </section>
      </PageLayout>
    );
  }
}
