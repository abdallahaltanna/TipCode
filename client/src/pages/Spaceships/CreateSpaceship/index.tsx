import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormSelect,
  SubmitBtn,
  BackBtn
} from '../../../components';
import { createItem } from '../../../api';

const CreateSpaceship: React.FC = (): React.ReactElement => {
  // Navigation hook
  const navigate = useNavigate();

  // Form fields
  const [Name, setName] = useState<string>('');
  const [Capacity, setCapacity] = useState<number>(1);
  const [statusOptions] = useState<string[]>(['Active', 'Inactive']);
  const [Status, setStatus] = useState<string>('Active');

  // Check if all fields are filled
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Check if all fields are filled
    if (Name && Capacity > 0 && Status) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [Name, Capacity, Status]);

  // Create a spaceship
  const createSpaceship = async (e: React.FormEvent) => {
    const success = await createItem(e, '/spaceships', {
      Name,
      Capacity,
      Status
    });
    if (success) {
      navigate('/spaceships');
    }
  };

  return (
    <>
      <BackBtn link='/spaceships' />
      <form className='max-w-sm mx-auto'>
        <FormControl
          name='Name'
          type='text'
          value={Name}
          onChange={e => setName(e.target.value)}
        />

        <FormControl
          name='Capacity'
          type='number'
          value={Capacity}
          onChange={e => setCapacity(parseInt(e.target.value))}
        />

        <FormSelect
          name='Status'
          options={statusOptions}
          value={Status}
          onChange={e => setStatus(e.target.value)}
        />

        <SubmitBtn
          name='Create Spaceship'
          isFormValid={isFormValid}
          onClick={e => createSpaceship(e)}
        />
      </form>
    </>
  );
};
export default CreateSpaceship;
