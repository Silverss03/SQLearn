import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateBeforeIcon from '@mui/icons-material/ArrowBackIosRounded';

import { StyledLink } from './style';

type LinkProps = {
  children: React.ReactNode;
  href: string;
};

export function PreviousPageLink({ children, href }: LinkProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <StyledLink onClick={() => navigate(href)}>
      {children}
    </StyledLink>
  );
}
