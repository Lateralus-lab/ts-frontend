interface Props {
  name: string;
  title: string;
  id?: string;
  value: string;
  rows: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = (props: Props) => {
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={props.name}
      >
        {props.title}
      </label>
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={props.name}
        id={props.name}
        value={props.value}
        rows={props.rows}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextArea;
