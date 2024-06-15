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
      className='w-fit py-1 px-6 rounded text-white bg-[#6c63ff] inline-block hover:bg-[#6761d8] transition-all duration-300 ease-in-out'
    >
      {name}
    </Link>
  );
};
export default NewBtn;
