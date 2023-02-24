import { forwardRef, LegacyRef } from "react";
import Alert from "../Alert";

interface Props {
  title?: string;
  name?: string;
  id?: string;
  className: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  errorDiv?: string;
  errorMsg?: string | null;
  value: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef((props: Props, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={props.name}
      >
        {props.title}
      </label>
      <input
        className={props.className}
        type={props.type}
        id={props.id}
        ref={ref}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        autoComplete={props.autoComplete}
        onChange={props.onChange}
      />
      <Alert message={props.errorMsg} variant={props.errorDiv} />
    </div>
  );
});

export default Input;
