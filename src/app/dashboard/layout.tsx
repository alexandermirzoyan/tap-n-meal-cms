import React from 'react';
import { Navigation } from '@/layouts/Navigation';
import './styles.scss';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='dashboard--layout'>
    <Navigation />
    <div className='dashboard--content'>
      {children}
    </div>
  </div>
);

export default DashboardLayout;
