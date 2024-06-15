import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, SubmitBtn, BackBtn } from '../../../components';
import { createItem } from '../../../api';

const CreateMission: React.FC = (): React.ReactElement => {
  // Navigation hook
  const navigate = useNavigate();

  // Form fields
  const [Destination, setDestination] = useState<number>(10);
  const [Duration, setDuration] = useState<number>(1);

  // Check if all fields are filled
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    if (Destination && Duration > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [Destination, Duration]);

  // Create a mission
  const createMission = async (e: React.FormEvent) => {
    const success = await createItem(e, '/missions', {
      Destination,
      Duration
    });
    if (success) {
      navigate('/missions');
    }
  };

  return (
    <>
      <BackBtn link='/missions' />
      <form className='max-w-sm mx-auto'>
        <FormControl
          name='Destination'
          type='number'
          value={Destination}
          onChange={e => setDestination(parseInt(e.target.value))}
        />

        <FormControl
          name='Duration'
          type='number'
          value={Duration}
          onChange={e => setDuration(parseInt(e.target.value))}
        />

        <SubmitBtn
          name='Create Mission'
          isFormValid={isFormValid}
          onClick={e => createMission(e)}
        />
      </form>
    </>
  );
};
export default CreateMission;
