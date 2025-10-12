import { ReactNode } from 'react';
import * as S from './styles';

export type Props = {
  children?: ReactNode;
};

export function OverlayScreen({ children }: Props): JSX.Element {
  return <S.StyledBox>{children}</S.StyledBox>;
}
