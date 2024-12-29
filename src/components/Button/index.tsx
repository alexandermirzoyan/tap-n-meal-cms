import { ButtonProps } from './types';
import './styles.scss';

export const Button = ({ children, ...rest }: ButtonProps) => (
  <button className='button' {...rest}>
    {children}
  </button>
);
