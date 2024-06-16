import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormSelect,
  SubmitBtn,
  BackBtn
} from '../../../components';
import { createItem } from '../../../api';

// Create crewmember page
const CreateCrewmember: React.FC = (): React.ReactElement => {
  // Navigate to a different page
  const navigate = useNavigate();

  // Form fields
  const [Name, setName] = useState<string>('');
  const [RoleOptions] = useState<string[]>([
    'Commander',
    'Pilot',
    'Engineer',
    'Scientist',
    'Medic',
    'Technician'
  ]);
  const [Role, setRole] = useState<string>('Technician');
  const [ExperienceLevelOptions] = useState<string[]>([
    'Novice',
    'Intermediate',
    'Advanced',
    'Expert',
    'Veteran'
  ]);
  const [ExperienceLevel, setExperienceLevel] = useState<string>('Novice');

  // Check if all fields are filled
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    // Check if all fields are filled
    if (Name && Role && ExperienceLevel) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [Name, Role, ExperienceLevel]);

  // Create a crewmember
  const createCrewmember = async (e: React.FormEvent) => {
    const success = await createItem(e, '/crewmembers', {
      Name,
      Role,
      ExperienceLevel
    });
    if (success) {
      navigate('/crewmembers');
    }
  };

  return (
    <>
      <BackBtn link='/crewmembers' />
      <form className='max-w-sm mx-auto'>
        <FormControl
          name='Name'
          type='text'
          value={Name}
          onChange={e => setName(e.target.value)}
        />

        <FormSelect
          name='Role'
          options={RoleOptions}
          value={Role}
          onChange={e => setRole(e.target.value)}
        />

        <FormSelect
          name='ExperienceLevel'
          options={ExperienceLevelOptions}
          value={ExperienceLevel}
          onChange={e => setExperienceLevel(e.target.value)}
        />

        <SubmitBtn
          name='Create Crewmember'
          isFormValid={isFormValid}
          onClick={e => createCrewmember(e)}
        />
      </form>
    </>
  );
};
export default CreateCrewmember;
