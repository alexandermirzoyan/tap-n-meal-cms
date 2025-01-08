import RCInput from 'rc-input';
import { IInputProps } from '@/components/Input/types';

import './styles.scss';

export const Input = ({
  id,
  placeholder,
  name,
  value,
  onChange,
}: IInputProps) => {
  const inputId = name || id;

  return (
    <div className='input-container'>
      <label htmlFor={inputId}>{placeholder}</label>
      <RCInput
        id={inputId}
        name={name}
        value={value}
        placeholder={`Enter ${placeholder}`}
        onChange={onChange}
      />
    </div>
  );
};
