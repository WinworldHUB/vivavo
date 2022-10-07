import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useLocalStorage from "react-use-localstorage";
import PageLayout from "../../components/PageLayout";
import WishFlexBox from "../../components/WishFlexBox";
import WishModal from "../../components/WishModal";
import WishSimpleCard from "../../components/WishSimpleCard";
import pageConfig from "../../data/config.json";
import { AppUtils } from "../../services/AppUtils";
import useGenealogySettings from "../../services/useGenealogySettings";

export default function GenealogySettings() {
  const [distributor, setDistributor] = useLocalStorage("distributor", null);
  const [loggedInDistributor, setLoggedInDistributor] = useState(null);
  const { preferences, settingsError, fetchPreferences } =
    useGenealogySettings(loggedInDistributor);

  useEffect(() => {
    if (distributor) {
      const distributorFromLocalStorage = JSON.parse(distributor);

      setLoggedInDistributor(distributorFromLocalStorage.distributor_id);
    }
  }, []);

  useEffect(() => {
    if (loggedInDistributor) {
      fetchPreferences();
    }
  }, [loggedInDistributor]);

  useEffect(() => { 
    if (preferences) {
      
    }
  }, [preferences]);

  const [orgs, setOrgs] = useState([
    ...pageConfig.mygenealogySettings.organizations,
  ]);
  //const [orgIndex, setSelectedOrgIndex] = useState(-1);

  useEffect(() => {}, [orgs]);

  function RenderOrganization({ organization, key }) {
    return (
      <>
        <WishFlexBox key={key} className="p-1 border onhover-shadow">
          <div>
            <p>
              <strong>{organization.title}</strong>
            </p>
            <p style={{ lineHeight: "1.5" }}>
              Preferred Distributor ID: {organization.distributorId}
              <br />
              Preferred Distributor Name: {organization.distributorName}
              <br />
              Preferred Side: {organization.side}
              <br />
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              //setSelectedOrgIndex(key);
              AppUtils.showDialog("dlgEditPreferrence");
            }}
          >
            EDIT PREFERENCE
          </button>
        </WishFlexBox>
        <br />
      </>
    );
  }
  return (
    <PageLayout {...pageConfig.mygenealogySettings}>
      <WishSimpleCard>
        {orgs.map((organization, index) => {
          return <RenderOrganization organization={organization} key={index} />;
        })}
      </WishSimpleCard>
      <WishModal
        id="dlgEditPreferrence"
        title="Edit Preferences"
        finishTitle="Update"
      >
        <div class="form-group row">
          <label for="txtDistributorID" class="col col-form-label">
            Preferred Distributor ID
          </label>
          <div class="col-6">
            <input
              id="txtDistributorID"
              name="txtDistributorID"
              type="text"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="txtDistributorName" class="col col-form-label">
            Preferred Distributor Name
          </label>
          <div class="col-6">
            <input
              id="txtDistributorName"
              name="txtDistributorName"
              type="text"
              class="form-control"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="ddPreferredSide" class="col col-form-label">
            Preferred Side
          </label>
          <div class="col-6">
            <select
              id="ddPreferredSide"
              name="ddPreferredSide"
              class="custom-select"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </WishModal>
    </PageLayout>
  );
}
