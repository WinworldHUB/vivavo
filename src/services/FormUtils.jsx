import WishSelect from "../components/WishSelect";
import WishSingleLineText from "../components/WishSingleLineText";

export const FormUtills = {
  RenderEditableForm: function (formJson = Array) {
    return (
      <>
        {formJson.map((element, index) => {
          switch (element.type) {
            case "dropdown":
              return (
                <WishSelect label={element.title} data={element.options} />
              );

            default:
              return (
                <WishSingleLineText
                  label={element.title}
                  placeholder={element.title}
                  initialValue={element.value}
                  required={true}
                />
              );
          }
        })}
      </>
    );
  },

  getFormData: function (formId) {
    

  }
};
