import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledLink } from './style';

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

export function PageLink({ children, href }: LinkProps): JSX.Element {
  const navigate = useNavigate();

  return <StyledLink onClick={() => navigate(href)}>{children}</StyledLink>;
}
