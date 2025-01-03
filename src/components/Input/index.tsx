import RCInput from 'rc-input';
import { IInputProps } from '@/components/Input/types';

import './styles.scss';

export const Input = ({
  id,
  placeholder,
  name,
}: IInputProps) => {
  const inputId = name || id;

  return (
    <div className='input-container'>
      <label htmlFor={inputId}>{placeholder}</label>
      <RCInput id={inputId} name={name} placeholder={`Enter ${placeholder}`} />
    </div>
  );
};
