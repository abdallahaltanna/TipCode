import React from 'react';

// Form Controller Component
const FormControl = ({
  name,
  type,
  value,
  onChange
}: {
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      {/* Input */}
      <input
        type={type}
        id={name}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:color-[#6c63ff] focus:border-[#6c63ff] block w-full p-2.5'
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};
export default FormControl;
