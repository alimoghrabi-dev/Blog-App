type Props = {
  type: string;
  id: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
};

const InputComponent = ({
  type,
  id,
  placeholder,
  onChange,
  value,
  name,
}: Props) => {
  return (
    <input
      name={name}
      onChange={onChange}
      type={type}
      id={id}
      value={value}
      className="bg-gray-100 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      required
    />
  );
};

export default InputComponent;
