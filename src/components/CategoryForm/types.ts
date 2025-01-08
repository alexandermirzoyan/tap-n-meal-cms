export interface ICategoryFormProps {
  id: number;
}

export type TFormValues = { en: string, hy: string, ru: string };

export type TTranslationResponse = {
  name: string;
  locale: {
    code: 'en' | 'hy' | 'ru';
  };
}
