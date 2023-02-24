import Alert from "../Alert";

interface Props {
  name: string;
  title: string;
  id?: string;
  value: string;
  placeHolder: string;
  errorDiv?: string | undefined;
  errorMsg?: string | null;
  options: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface optionProps {
  id: string;
  value: string;
}

const Select = (props: Props) => {
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={props.name}
      >
        {props.title}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">{props.placeHolder}</option>
        {props.options.map((option: optionProps) => {
          return (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
      <Alert message={props.errorMsg} variant={props.errorDiv} />
    </div>
  );
};

export default Select;
