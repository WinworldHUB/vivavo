/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import AnnouncementItem from "../components/AnnouncementItem";
import PageLayout from "../components/PageLayout";

export default class Announcements extends Component {
  render() {
    return (
      <PageLayout activeSideMenu="6" pageTitle="Announcements">
        <section className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <AnnouncementItem title="This is an announcement 1">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </AnnouncementItem>

                <AnnouncementItem
                  title="This is an announcement 2"
                  addTopPadding
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </AnnouncementItem>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }
}
