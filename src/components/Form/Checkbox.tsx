interface Props {
  name: string;
  title: string;
  id: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: Props) => {
  return (
    <div>
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="checkbox"
        name={props.name}
        id={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor={props.name}
      >
        {props.title}
      </label>
    </div>
  );
};

export default Checkbox;
