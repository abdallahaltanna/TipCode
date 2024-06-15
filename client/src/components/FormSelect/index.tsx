import React from 'react';

// Form Select Props
type FormSelectProps = {
  name: string;
  options: string[];
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

// From Select Component
const FormSelect: React.FC<FormSelectProps> = ({
  name,
  options,
  value,
  onChange
}): React.ReactElement => {
  return (
    <div className='mb-5'>
      {/* Label */}
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium text-gray-900'
      >
        {name}
      </label>
      {/* Select */}
      <select
        id={name}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:color-[#6c63ff] focus:border-[#6c63ff] block w-full p-2.5'
        value={value}
        onChange={onChange}
        required
      >
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormSelect;
