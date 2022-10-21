import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishToaster from "../../components/WishToaster";
import useEnrollment from "../../services/useEnrollment";
import useMasters from "../../services/useMasters";

export default function OngoingEnrollments() {
  const breadcrumbs = [];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "Enrollment", linkTo: "/enrollment" });
  breadcrumbs.push({ title: "Ongoing Enrollments", linkTo: "/" });

  const progresses = [
    "Personal Details",
    "Contact Details",
    "Bank Details",
    "Co-Applicant Details",
    "Preview",
  ];

  const { loggedInUser } = useMasters();
  const [enrollmentError, enrollmentLoading, { pendingEnrollments }] =
    useEnrollment(loggedInUser);

  // progresses.push({
  //   progress: ["Personal Details", "Contact Details", "Bank Details"],
  // });

  // progresses.push({
  //   progress: ["Personal Details"],
  // });

  // progresses.push({
  //   progress: ["Personal Details", "Contact Details"],
  // });

  // progresses.push({
  //   progress: [
  //     "Personal Details",
  //     "Contact Details",
  //     "Bank Details",
  //     "Co-Applicant Details",
  //   ],
  // });

  useEffect(() => {
    if (enrollmentError) {
      WishToaster({ toastMessage: enrollmentError, toastType: "error" });
    }
  }, [enrollmentError]);

  const pageHeader = function () {
    return (
      <div className="row">
        <div className="col-8">
          <h3>My Enrollments</h3>
        </div>
        <div className="col-4 text-right">
          <Link className="btn btn-primary" to="/enrolluser">
            New Enrollment
          </Link>
        </div>
      </div>
    );
  };

  const renderProgress = function (currProgress) {
    return progresses.map((step, index) => {
      if (index === currProgress) {
        return (
          <Link to="/enrolluser" state={{ step: index }}>
            {step}{" "}
            {index < progresses.length ? (
              <i className="la la-angle-right"></i>
            ) : (
              ""
            )}
          </Link>
        );
      } else if (index < currProgress) {
        return (
          <>
            {step}{" "}
            {index < progresses.length ? (
              <i className="la la-angle-right"></i>
            ) : (
              ""
            )}
          </>
        );
      }
    });
  };

  const page = function () {
    return (
      <div className="table-responsive">
        <table className="table mb-0">
          <thead className="bg-primary white">
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Progress</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {pendingEnrollments ? (
              (pendingEnrollments ?? []).map((pendingEnrollment, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {pendingEnrollment?.first_name}&nbsp;
                      {pendingEnrollment?.second_name}
                    </td>
                    <td>{renderProgress(pendingEnrollment?.section_level)}</td>
                    <td className="text-center">
                      <span className="h4 text-danger">
                        <i className="las la-trash-alt"></i>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  <strong>
                    {enrollmentError ??
                      "Seems like you have no pending enrollees in your list"}
                  </strong>
                </td>
              </tr>
            )}
            {/* <tr>
              <th scope="row">1</th>
              <td>John Doe</td>
              <td>{renderProgress(progresses[0].progress)}</td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>John Doe2</td>
              <td>{renderProgress(progresses[1].progress)}</td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>John Doe3</td>
              <td>{renderProgress(progresses[2].progress)}</td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>John Doe4</td>
              <td>{renderProgress(progresses[3].progress)}</td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <PageLayout
      activeSideMenu="3"
      pageTitle="Ongoing Enrollments"
      breadcrumbs={breadcrumbs}
      header={" "}
    >
      <WishSimpleCard header={pageHeader()} body={page()}></WishSimpleCard>
    </PageLayout>
  );
}
