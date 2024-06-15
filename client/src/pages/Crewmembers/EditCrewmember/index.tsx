import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormControl,
  FormSelect,
  SubmitBtn,
  BackBtn
} from '../../../components';
import { updateItem } from '../../../api';

// Edit crewmember page
const EditCrewmember: React.FC = (): React.ReactElement => {
  // Navigate to a different page
  const navigate = useNavigate();
  // Get crewmember ID from URL
  const { id } = useParams<{ id: string }>();

  // Form fields
  const [Name, setName] = useState<string>('');
  const [RoleOptions, setRoleOptions] = useState([
    'Commander',
    'Pilot',
    'Engineer',
    'Scientist',
    'Medic',
    'Technician'
  ]);
  const [Role, setRole] = useState('Technician');
  const [ExperienceLevelOptions, setExperienceLevelOptions] = useState([
    'Novice',
    'Intermediate',
    'Advanced',
    'Expert',
    'Veteran'
  ]);
  const [ExperienceLevel, setExperienceLevel] = useState('Novice');
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

  // Edit crewmember
  const editCrewmember = async (e: React.FormEvent) => {
    const success = await updateItem(e, `/crewmembers/${id}`, {
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
          name='Edit Crewmember'
          isFormValid={isFormValid}
          onClick={e => editCrewmember(e)}
        />
      </form>
    </>
  );
};
export default EditCrewmember;
