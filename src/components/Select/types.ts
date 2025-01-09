type TOption = {
  value: string | number;
  label: string;
  image?: string;
};

export interface ISelectProps {
  options: TOption[];
  onChange?: (_: any) => void;
}
