/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import AnnouncementItem from "../components/AnnouncementItem";
import PageLayout from "../components/PageLayout";
import WishMessageComposer from "../components/WishMessageComposer";
import WishMessageItem from "../components/WishMessageItem";
import WishSimpleCard from "../components/WishSimpleCard";

export default function VMail() {
  const breadcrumbs = [];
  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "VMail", linkTo: "/" });

  const [selectedTab, setSelectedTab] = useState(parseInt(1));
  const tabs = [
    { title: "Compose", icon: "pen" },
    { title: "Inbox", icon: "inbox" },
    { title: "Sent Items", icon: "paper-plane" },
  ];

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
      recentMessages: [
        {
          subject: "Long Long Mail Subject 2 | Message Chain 1",
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
          subject: "Long Long Mail Subject 2 | Message Chain 2",
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
          subject: "Long Long Mail Subject 2 | Message Chain 2",
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
      ],
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
                {tabs.map((tab, index) => {
                  return (
                    <li
                      className={"nav-item " + (index === 0 ? "mr-auto " : " ")}
                    >
                      <a
                        className={
                          "nav-link " + (selectedTab === index ? "active" : "")
                        }
                        id={"main-tab" + index}
                        data-toggle="tab"
                        aria-controls={"maintab" + index}
                        href={"#maintab" + index}
                        aria-expanded={selectedTab === index ? "true" : "false"}
                        onClick={() => {
                          setSelectedTab(index);
                        }}
                      >
                        <i className={"las la-" + tab.icon}></i> {tab.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div
              role="tabpanel"
              className={"tab-pane " + (selectedTab === 0 ? "active" : "")}
              id="maintab0"
              aria-labelledby="main-tab0"
            >
              <WishMessageComposer
                mailSubjects={mailSubjects()}
                onSent={() => {
                  // Set inbox active
                  setSelectedTab(2);
                }}
              ></WishMessageComposer>
            </div>
            <div
              role="tabpanel"
              className={"tab-pane " + (selectedTab === 1 ? "active" : "")}
              id="maintab1"
              aria-labelledby="main-tab1"
            >
              <WishSimpleCard
                body={
                  <WishMessageItem emails={mails} showReply></WishMessageItem>
                }
              ></WishSimpleCard>
            </div>
            <div
              role="tabpanel"
              className={"tab-pane " + (selectedTab === 2 ? "active" : "")}
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
