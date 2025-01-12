import React from 'react';
import NextImage from 'next/image';
import RCSelect, { Option } from 'rc-select';

import { ISelectProps } from '@/components/Select/types';

import './styles.scss';

export const Select = ({
  options,
  label,
  onChange,
  value,
}: ISelectProps) => (
  <div className='select--container'>
    <label>{label}</label>
    <RCSelect
      value={value}
      onChange={onChange}
      placeholder={`Select ${label}`}
    >
      {
        options.map((option) => {
          const imageSrc = option?.image ? `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}${option?.image}` : '';

          return (
            <Option value={option.value} key={option.value}>
              <div className='select--option-container'>
                { option.image ? (
                  <NextImage
                    width={40}
                    height={40}
                    src={imageSrc}
                    className='select--option-img'
                    alt='Image preview'
                  />
                ) : null}

                {option.label}
              </div>
            </Option>
          );
        })
      }
    </RCSelect>
  </div>
);
