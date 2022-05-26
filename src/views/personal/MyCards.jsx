import DocumentCard from "../../components/DocumentCard";
import PageLayout from "../../components/PageLayout";

export default function MyCards(props) {
  const handleActionClick = (event) => {
    console.log("Action Clicked");
  };
  return (
    <PageLayout activeSideMenu="0" pageTitle="My Cards">
      <section className="row">
        <div className="col-md-4 col-sm-6">
          <DocumentCard
            title="Welcome Letter"
            status="preview"
            onActionClick={(e) => handleActionClick(e)}
          ></DocumentCard>
        </div>

        <div className="col-md-4 col-sm-6">
          <DocumentCard
            title="ID Card"
            status="preview"
            onActionClick={(e) => handleActionClick(e)}
          ></DocumentCard>
        </div>

        <div className="col-md-4 col-sm-6">
          <DocumentCard
            title="PCM Card"
            status="preview"
            onActionClick={(e) => handleActionClick(e)}
          ></DocumentCard>
        </div>
        <div className="col-md-4 col-sm-6">
          <DocumentCard
            title="Insurance Card"
            status="preview"
            onActionClick={(e) => handleActionClick(e)}
          ></DocumentCard>
        </div>
      </section>
    </PageLayout>
  );
}
