import React from 'react';
import * as S from './styles';

type Props = {
  children: React.ReactNode;
};

export function PageLayout({ children }: Props): JSX.Element {
  return <S.Page>{children}</S.Page>;
}
