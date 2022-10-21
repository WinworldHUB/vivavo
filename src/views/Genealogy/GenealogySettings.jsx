import React, { useEffect, useState } from "react";
import PageLayout from "../../components/PageLayout";
import WishFlexBox from "../../components/WishFlexBox";
import WishSelect from "../../components/WishFormComponents/WishSelect";
import WishSingleLineText from "../../components/WishFormComponents/WishSingleLineText";
import WishModal from "../../components/WishModal";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishToaster from "../../components/WishToaster";
import pageConfig from "../../data/config.json";
import { AppUtils } from "../../services/AppUtils";
import useGenealogySettings from "../../services/useGenealogySettings";
import useMasters from "../../services/useMasters";

export default function GenealogySettings() {
  const { loggedInUser } = useMasters();
  const { preferences, settingsError, savePreferences } =
    useGenealogySettings(loggedInUser);

  const [orgs, setOrgs] = useState([]);
  const [selectedOrgIndex, setSelectedOrgIndex] = useState(-1);

  const [newDistributorPosition, setNewDistributorPosition] = useState(null);

  useEffect(() => {
    if (settingsError) {
      WishToaster({
        toastMessage: settingsError,
        toastType: "error",
      });
    }
  }, [settingsError]);

  const ORGANIZATION_POSITIONS = ["Left", "Right", "Other"];

  const organizationSide = (index) => {
    switch (index) {
      case 1:
        return ORGANIZATION_POSITIONS[0];

      case 2:
        return ORGANIZATION_POSITIONS[1];

      default:
        return ORGANIZATION_POSITIONS[2];
    }
  };
  useEffect(() => {
    if (preferences) {
      const organizations = [];

      preferences.map((organization) => {
        const newOrg = {
          title: "Organization " + organization.position_id,
          distributorId: organization.preferred_distributor_id,
          distributorName: organization.preferred_distributor_name,
          side: organizationSide(organization.preferred_position_id),
          positionId: organization?.position_id,
        };

        organizations.push(newOrg);
      });

      setOrgs(organizations);
    }
  }, [preferences]);

  function RenderOrganization({ organization, index }) {
    return (
      <>
        <WishFlexBox key={index} className="p-1 border onhover-shadow">
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setSelectedOrgIndex(index);
              AppUtils.showDialog("dlgEditPreference");
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
          return (
            <RenderOrganization organization={organization} index={index} />
          );
        })}
      </WishSimpleCard>
      <WishModal
        id="dlgEditPreference"
        title="Edit Preferences"
        finishTitle="Update"
        onFinish={() => {
          const newPreferences = {
            distributor_id: loggedInUser.distributor_id,
            position_id: orgs[selectedOrgIndex]?.positionId,
            preferred_distributor_id: orgs[selectedOrgIndex]?.distributorId,
            preferred_distributor_name: orgs[selectedOrgIndex]?.distributorName,
            preferred_position_id:
              ORGANIZATION_POSITIONS.indexOf(newDistributorPosition) + 1,
          };

          savePreferences(newPreferences);
        }}
      >
        <WishSingleLineText
          label="Preferred Distributor ID"
          initialValue={orgs[selectedOrgIndex]?.distributorId}
          placeholder="Preferred Distributor ID"
          readonly
        />
        <WishSingleLineText
          label="Preferred Distributor Name"
          initialValue={orgs[selectedOrgIndex]?.distributorName}
          placeholder="Preferred Distributor Name"
          readonly
        />
        <WishSelect
          label="Preferred Side"
          data={ORGANIZATION_POSITIONS}
          initialValue={orgs[selectedOrgIndex]?.side}
          onSelect={setNewDistributorPosition}
        />
      </WishModal>
    </PageLayout>
  );
}
