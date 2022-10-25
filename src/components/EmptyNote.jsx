import WishFlexBox from "./WishFlexBox";

const EmptyNote = ({ message }) => {
  return (
    <WishFlexBox justifyContent="center">
      <span
        className="spinner-grow spinner-grow-sm text-warning"
        role="status"
        aria-hidden="true"
      ></span>
      <strong>&nbsp; {message ?? "No data to show here."}</strong>
    </WishFlexBox>
  );
};

export default EmptyNote;
