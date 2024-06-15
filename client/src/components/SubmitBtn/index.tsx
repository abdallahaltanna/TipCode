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
      className={`text-white bg-[#6c63ff] hover:bg-[#6761d8] transition-all duration-300 ease-in-out  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
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
