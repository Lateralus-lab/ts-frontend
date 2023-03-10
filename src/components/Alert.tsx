type AlertProps = {
  message: string | undefined | null;
  variant: string | undefined;
};

const Alert = (props: AlertProps): JSX.Element => {
  const { message, variant } = props;

  const variantClass = variant ? `alert-${variant}` : "hidden";
  const svgClass =
    variantClass === "alert-danger"
      ? "flex-shrink-0 inline w-5 h-5 mr-3"
      : "hidden";

  return (
    <div className={variantClass}>
      <div className="flex items-center">
        <svg
          className={svgClass}
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Alert;
