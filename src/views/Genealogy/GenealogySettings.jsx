import PageLayout from "../../components/PageLayout";
import pageConfig from "../../data/config.json";
import WishSimpleCard from "../../components/WishSimpleCard";
import useGenealogySettings from "../../services/useGenealogySettings";
import useMasters from "../../services/useMasters";
import WishFlexBox from "../../components/WishFlexBox";
import WishModal from "../../components/WishModal";
import LoadingNote from "../../components/LoadingNote";
import WishSingleLineText from "../../components/WishFormComponents/WishSingleLineText";
import WishSelect from "../../components/WishFormComponents/WishSelect";
import { AppUtils } from "../../services/AppUtils";
import { useState } from "react";
import { useEffect } from "react";
import WishToaster from "../../components/WishToaster";

const GenealogySettings = () => {
  const { loggedInUser } = useMasters();
  const { preferences, settingsError, savePreferences, positions } =
    useGenealogySettings(loggedInUser?.distributor_id);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  useEffect(() => {
    if (settingsError) {
      WishToaster({ toastMessage: settingsError });
    }
  }, [settingsError]);

  const RenderOrganization = ({ organization }) => {
    return (
      <>
        <WishFlexBox
          key={organization.position_id}
          className="p-1 border onhover-shadow"
        >
          <div>
            <p>
              <strong>Organization {organization.position_id}</strong>
            </p>
            <p style={{ lineHeight: "1.5" }}>
              Preferred Distributor ID: {organization.preferred_distributor_id}
              <br />
              Preferred Distributor Name:{" "}
              {organization.preferred_distributor_name}
              <br />
              Preferred Side:{" "}
              {
                positions?.filter(
                  (x) => x.id === organization.preferred_position_id
                )[0].title_name
              }
              <br />
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              const preference = {
                distributor_id: loggedInUser.distributor_id,
                position_id: organization.position_id,
                preferred_distributor_id: organization.preferred_distributor_id,
                preferred_distributor_name:
                  organization.preferred_distributor_name,
                preferred_position_id: organization.preferred_position_id,
              };

              setSelectedOrganization(preference);

              AppUtils.showDialog("dlgEditPreference");
            }}
          >
            EDIT PREFERENCE
          </button>
        </WishFlexBox>
        <br />
      </>
    );
  };

  return (
    <PageLayout {...pageConfig.mygenealogySettings}>
      <WishSimpleCard>
        {(preferences ?? []).map((organization, index) => {
          if (preferences && preferences.length > 0) {
            return (
              <RenderOrganization
                organization={organization}
                key={organization.position_id}
              />
            );
          } else if (preferences && preferences.length === 0) {
            <strong>No preferences found</strong>;
          } else {
            <LoadingNote />;
          }
        })}
      </WishSimpleCard>

      <WishModal
        id="dlgEditPreference"
        title="Edit Preferences"
        finishTitle="Update"
        onFinish={() => {
          savePreferences(selectedOrganization ?? null);
        }}
      >
        <WishSingleLineText
          label="Preferred Distributor ID"
          initialValue={selectedOrganization?.preferred_distributor_id}
          onChange={(value) => {
            setSelectedOrganization({
              ...selectedOrganization,
              preferred_distributor_id: value,
            });
          }}
        />
        <WishSingleLineText
          label="Preferred Distributor Name"
          initialValue={selectedOrganization?.preferred_distributor_name}
          onChange={(value) => {
            setSelectedOrganization({
              ...selectedOrganization,
              preferred_distributor_name: value,
            });
          }}
        />
        <WishSelect
          label="Preferred Side"
          data={positions ?? []}
          //dataValue="title"
          initialValue={selectedOrganization?.preferred_position_id}
          onSelect={(id) => {
            setSelectedOrganization({
              ...selectedOrganization,
              preferred_position_id: id,
            });
          }}
        />
      </WishModal>
    </PageLayout>
  );
};

export default GenealogySettings;
