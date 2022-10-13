import WishFlexBox from "./WishFlexBox";

const LoadingNote = ({ message }) => {
  return (
    <WishFlexBox justifyContent="center">
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <strong>&nbsp; {message ?? "Processing"}</strong>
    </WishFlexBox>
  );
};

export default LoadingNote;
