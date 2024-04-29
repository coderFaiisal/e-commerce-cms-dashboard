import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <section className="mx-auto max-w-7xl">{children}</section>;
};

export default Container;
