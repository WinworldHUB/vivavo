/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PageLayout from "../components/PageLayout";
import WishMessageComposer from "../components/WishMessageComposer";
import WishSimpleCard from "../components/WishSimpleCard";
import Data from "../data/Data.json";
import WishTabs from "../components/WishTabs";
import WishMailList from "../components/WishMail/WishMailList";
import WishModal from "../components/WishModal";
import { useState } from "react";
import _ from "lodash";
import { AppUtils } from "../services/AppUtils";
import WishMailDetails from "../components/WishMail/WishMailDetails";

export default function VMail() {
  const breadcrumbs = [];
  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "VMail", linkTo: "/" });

  const tabs = [
    { title: "Inbox", icon: "inbox" },
    { title: "Sent Items", icon: "paper-plane" },
  ];

  const [mails, setMails] = useState(Data.Mails);
  const [selectedMessage, setSelectedMessage] = useState();

  const filterMails = function (filterText) {
    var mailsCopy = [];
    var mailList = Array.from(Data.Mails);

    if (filterText.trim() !== "") {
      mailList.forEach((mail) => {
        if (mail.subject.includes(filterText)) {
          mailsCopy.push(_.cloneDeep(mail));
        }
      });
    } else {
      mailsCopy = mailList;
    }

    setMails(mailsCopy);
  };

  const actions = (
    <div>
      <div className="form-group row">
        <div className="col-8">
          <input
            id="txtFilter"
            name="txtFiler"
            type="text"
            className="form-control"
            placeholder="Filter"
            onChange={(e) => {
              filterMails(e.target.value);
            }}
          />
        </div>
        <button
          className="col-4 btn btn-warning"
          onClick={() => {
            AppUtils.showDialog("dlgComposeMail");
          }}
        >
          Compose
        </button>
      </div>
    </div>
  );

  const mailSubjects = function () {
    var subjects = [];
    Data.Mails.map((mail, index) => {
      subjects.push(mail.subject);
    });

    return subjects;
  };

  return (
    <PageLayout
      activeSideMenu="7"
      pageTitle="VMail"
      breadcrumbs={breadcrumbs}
      header=""
    >
      <section className="row">
        <div className="col-12">
          <WishSimpleCard className="">
            <WishTabs tabs={tabs} actions={actions}>
              <WishMailList
                messages={mails}
                onMessageClicked={(index) => {
                  AppUtils.showDialog("dlgMailPreview");
                  setSelectedMessage(mails[index]);
                }}
              />
              <WishMailList
                messages={mails}
                onMessageClicked={(index) => {
                  AppUtils.showDialog("dlgMailPreview");
                  setSelectedMessage(mails[index]);
                }}
              />
            </WishTabs>
          </WishSimpleCard>
        </div>
      </section>

      <WishModal
        id="dlgMailPreview"
        noFooter
        modalSize="modal-xl"
        title={selectedMessage && selectedMessage.subject}
        subTitle={selectedMessage && selectedMessage.timestamp}
        headerClassname="bg-primary"
      >
        <WishMailDetails message={selectedMessage} />
      </WishModal>
      <WishModal
        id="dlgComposeMail"
        title="New Mail Message"
        modalSize="modal-lg"
        finishTitle="Send Message"
      >
        <WishMessageComposer
          mailSubjects={mailSubjects()}
        ></WishMessageComposer>
      </WishModal>
    </PageLayout>
  );
}
