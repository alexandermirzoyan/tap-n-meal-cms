import { ReactNode } from 'react';
import type { Metadata } from 'next';

import '@/styles/global.scss';
import '@/styles/fonts.scss';

export const metadata: Metadata = {
  title: 'TapNMeal Admin Panel',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang='en'>
    <body>
      {children}
    </body>
  </html>
);

export default RootLayout;
