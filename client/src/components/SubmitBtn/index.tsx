import React from 'react';

// Submit Btn Props
type SubmitBtnProps = {
  name: string;
  isFormValid: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
};

// Submit Btn Component
const SubmitBtn: React.FC<SubmitBtnProps> = ({
  name,
  isFormValid,
  onClick
}): React.ReactElement => {
  return (
    <button
      type='submit'
      className={`text-white bg-[#6c63ff]  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
        isFormValid ? '' : 'opacity-50 cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={!isFormValid}
    >
      {name}
    </button>
  );
};
export default SubmitBtn;
