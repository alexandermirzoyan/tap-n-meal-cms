import React from 'react';
import NextImage from 'next/image';
import RCSelect from 'rc-select';
import { FlattenOptionData } from 'rc-select/es/interface';
import { BaseOptionType } from 'rc-select/lib/Select';

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
      options={options}
      optionRender={(optionOrigin: FlattenOptionData<BaseOptionType>) => {
        const { image, label: optionLabel } = optionOrigin.data;

        if (image) {
          const imageSrc = image ? `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}${image}` : '';

          return (
            <div className='select--option-container'>
              <NextImage
                width={40}
                height={40}
                src={imageSrc}
                className='select--option-img'
                alt='Image preview'
              />

              {optionLabel}
            </div>
          );
        }

        return optionLabel;
      }}
    />
  </div>
);
