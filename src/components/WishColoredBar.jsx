export default function WishColoredBar({ message, bgcolor }) {
  return (
    <div className={"alert alert-" + (bgcolor ?? "primary")} role="alert">
      {message}
    </div>
  );
}
