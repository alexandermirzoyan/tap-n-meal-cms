type TOptionValue = string | number;

type TOption = {
  value: TOptionValue;
  label: string;
  image?: string;
};

export interface ISelectProps {
  options: TOption[];
  label: string;
  onChange?: (_: any) => void;
  value?: TOptionValue;
}
