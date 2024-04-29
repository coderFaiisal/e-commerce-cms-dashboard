'use client';

import Container from '@/components/container';
import NavBar from '@/components/home/navBar';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  );
};

export default layout;
