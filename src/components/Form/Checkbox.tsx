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
        type="checkbox"
        name={props.name}
        id={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.name}>{props.title}</label>
    </div>
  );
};

export default Checkbox;
