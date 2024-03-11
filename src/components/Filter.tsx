import React from "react";

interface IInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

const Filter: React.FC<IInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    } else {
      onChange(0);
    }
  };

  return <input type="number" value={value || ""} onChange={handleChange} />;
};

export default Filter;
