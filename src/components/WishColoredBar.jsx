export default function WishColoredBar({
  message,
  bgcolor,
  children,
  className,
}) {
  return (
    <div
      className={"alert alert-" + (bgcolor ?? "primary") + " " + className}
      role="alert"
    >
      {children ?? message}
    </div>
  );
}
