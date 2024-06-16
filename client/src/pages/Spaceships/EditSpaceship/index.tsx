import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormControl,
  FormSelect,
  SubmitBtn,
  BackBtn
} from '../../../components';
import { updateItem } from '../../../api';

const EditSpaceship: React.FC = (): React.ReactElement => {
  // Navigation hook
  const navigate = useNavigate();
  // Get spaceship ID from URL
  const { id } = useParams<{ id: string | undefined }>();

  // Form fields
  const [Name, setName] = useState<string>('');
  const [Capacity, setCapacity] = useState<number>(1);
  const [Status, setStatus] = useState<string>('Active');
  const [statusOptions] = useState<string[]>(['Active', 'Inactive']);

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

  // Edit spaceship
  const editSpaceship = async (e: React.FormEvent) => {
    const success = await updateItem(e, `/spaceships/${id}`, {
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
          name='Edit Spaceship'
          isFormValid={isFormValid}
          onClick={e => editSpaceship(e)}
        />
      </form>
    </>
  );
};
export default EditSpaceship;
