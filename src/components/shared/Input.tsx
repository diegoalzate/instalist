interface IInputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wish: string;
}

const Input = ({ handleChange, wish }: IInputProps) => {
  return (
    <input
      className="shadow-md text-sm text-gray-700 rounded p-2 focus:outline-none"
      name="wish"
      onChange={handleChange}
      value={wish}
      placeholder="fidget spinner..."
    />
  );
};

export default Input;
