import { ChangeEventHandler } from 'react';

export interface IInputProps {
  id?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
