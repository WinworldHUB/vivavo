import WishFlexBox from "./WishFlexBox";

const WishPreviewSection = ({
  data = null,
  title,
  titleBackground = "primary",
  showEdit = true,
  onEditClicked,
}) => {
  console.log(data);
  return (
    <>
      <div className="alert alert-primary" role="alert">
        <WishFlexBox>
          {title}
          {showEdit ? (
            <a onClick={onEditClicked}>
              <i className="las la-edit"></i>
            </a>
          ) : (
            <>&nbsp;</>
          )}
        </WishFlexBox>
      </div>
      <div className="">
        <table className="table table-borderless">
          <tbody>
            {data &&
              Object.keys(data).map((keyName, index) => (
                <tr key={index}>
                  <td>{keyName}</td>
                  <td>
                    {typeof data[keyName] === 'object'
                      ? data[keyName].title_name
                      : data[keyName]}
                  </td>
                </tr>
              ))}
            {/* {(data ?? []).map((prop, index) => (
              <tr key={index}>
                <td>{prop}</td>
                <td>{data[prop]}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WishPreviewSection;
