/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import AnnouncementItem from "../components/AnnouncementItem";
import PageLayout from "../components/PageLayout";
import WishMessageComposer from "../components/WishMessageComposer";
import WishMessageItem from "../components/WishMessageItem";
import WishSimpleCard from "../components/WishSimpleCard";

export default function VMail() {
  const breadcrumbs = [];
  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "VMail", linkTo: "/" });

  const mails = [
    {
      subject: "Long Long Mail Subject 1",
      message:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but  also the leap into electronic typesetting, remaining  essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum  passages, and more recently with desktop publishing software  like Aldus PageMaker including versions of Lorem Ipsum.",
      attachments: [
        {
          name: "Attchment 1",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
        {
          name: "Attchment 2",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
        {
          name: "Attchment 3",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
      ],
      timestamp: new Date(),
    },
    {
      subject: "Mail Subject 2",
      message:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but  also the leap into electronic typesetting, remaining  essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum  passages, and more recently with desktop publishing software  like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but  also the leap into electronic typesetting, remaining  essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum  passages, and more recently with desktop publishing software  like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but  also the leap into electronic typesetting, remaining  essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum  passages, and more recently with desktop publishing software  like Aldus PageMaker including versions of Lorem Ipsum.",
      attachments: [
        {
          name: "Attchment 1",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
      ],
      timestamp: new Date(),
    },
    {
      subject: "Mail Subject 3",
      message:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but  also the leap into electronic typesetting, remaining  essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum  passages, and more recently with desktop publishing software  like Aldus PageMaker including versions of Lorem Ipsum.",
      timestamp: new Date(),
    },
    {
      subject: "Mail Subject 4",
      message:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but  also the leap into electronic typesetting, remaining  essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum  passages, and more recently with desktop publishing software  like Aldus PageMaker including versions of Lorem Ipsum.",
      attachments: [
        {
          name: "Attchment 1",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
        {
          name: "Attchment 2",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
        {
          name: "Attchment 3",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
        {
          name: "Attchment 4",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
        {
          name: "Attchment 5",
          url: "https://www.ww-hub.com/wp-content/uploads/2021/04/WISH-ERP-Brochure.pdf",
        },
      ],
      timestamp: new Date(),
    },
  ];

  const mailSubjects = function () {
    var subjects = [];
    mails.map((mail, index) => {
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
          <div className="card">
            <div className="card-body">
              <ul className="nav nav-tabs pt-2">
                <li className="nav-item mr-auto">
                  <a
                    className="nav-link"
                    id="main-tab0"
                    data-toggle="tab"
                    aria-controls="maintab0"
                    href="#maintab0"
                    aria-expanded="false"
                  >
                    <i className="las la-pen"></i> Componse
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="main-tab1"
                    data-toggle="tab"
                    aria-controls="maintab1"
                    href="#maintab1"
                    aria-expanded="true"
                  >
                    <i className="las la-inbox"></i> Inbox
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="main-tab2"
                    data-toggle="tab"
                    aria-controls="maintab2"
                    href="#maintab2"
                    aria-expanded="false"
                  >
                    <i className="las la-paper-plane"></i> Sent Items
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div
              role="tabpanel"
              className="tab-pane"
              id="maintab0"
              aria-labelledby="main-tab0"
            >
              <WishMessageComposer
                mailSubjects={mailSubjects()}
                onSent={() => {
                  // Set inbox active
                }}
              ></WishMessageComposer>
            </div>
            <div
              role="tabpanel"
              className="tab-pane active"
              id="maintab1"
              aria-labelledby="main-tab1"
            >
              <WishSimpleCard
                body={<WishMessageItem emails={mails}></WishMessageItem>}
              ></WishSimpleCard>
            </div>
            <div
              className="tab-pane pt-2"
              id="maintab2"
              aria-labelledby="main-tab2"
            >
              <WishSimpleCard
                body={<WishMessageItem emails={mails}></WishMessageItem>}
              ></WishSimpleCard>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
