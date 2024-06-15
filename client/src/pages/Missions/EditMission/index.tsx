import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControl, SubmitBtn, BackBtn } from '../../../components';
import { updateItem } from '../../../api';

const EditMission: React.FC = (): React.ReactElement => {
  // Navigation hook
  const navigate = useNavigate();
  // Get mission ID from URL
  const { id } = useParams<{ id: string | undefined }>();

  // Form fields
  const [Destination, setDestination] = useState<number>(10);
  const [Duration, setDuration] = useState<number>(1);

  // Check if all fields are filled
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Check if all fields are filled
    if (Destination && Duration > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [Destination, Duration]);

  // Edit mission
  const editMission = async (e: React.FormEvent) => {
    const success = await updateItem(e, `/missions/${id}`, {
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
          name='Edit Mission'
          isFormValid={isFormValid}
          onClick={e => editMission(e)}
        />
      </form>
    </>
  );
};
export default EditMission;
