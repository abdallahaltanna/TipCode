import { Link } from 'react-router-dom';

// New Btn Component
const NewBtn = ({
  link,
  name
}: {
  link: string;
  name: string;
}): React.ReactElement => {
  return (
    <Link
      to={link}
      className='w-fit py-1 px-6 rounded text-white bg-[#6c63ff] inline-block'
    >
      {name}
    </Link>
  );
};
export default NewBtn;
