import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";

export default function OngoingEnrollments() {
  const breadcrumbs = [];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "Enrollment", linkTo: "/enrollment" });
  breadcrumbs.push({ title: "Ongoing Enrollments", linkTo: "/" });

  const progresses = [];

  progresses.push({
    progress: ["Personal Details", "Contact Details", "Bank Details"],
  });

  progresses.push({
    progress: ["Personal Details"],
  });

  progresses.push({
    progress: ["Personal Details", "Contact Details"],
  });

  progresses.push({
    progress: [
      "Personal Details",
      "Contact Details",
      "Bank Details",
      "Co-Applicant Details",
    ],
  });

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

  const renderProgress = function (progress) {
    return progress.map((step, index) => {
      if (index === progress.length - 1) {
        return (
          <Link to="/enrolluser" state={{ step: index }}>
            {step} <i className="la la-angle-right"></i>
          </Link>
        );
      } else {
        return (
          <>
            {step} <i className="la la-angle-right"></i>
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
            <tr>
              <th scope="row">1</th>
              <td>John Doe</td>
              <td>
                {renderProgress(progresses[0].progress)}
              </td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>John Doe2</td>
              <td>
              {renderProgress(progresses[1].progress)}
              </td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>John Doe3</td>
              <td>
              {renderProgress(progresses[2].progress)}
              </td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>John Doe4</td>
              <td>
              {renderProgress(progresses[3].progress)}
              </td>
              <td className="text-center">
                <span className="h4 text-danger">
                  <i className="las la-trash-alt"></i>
                </span>
              </td>
            </tr>
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
