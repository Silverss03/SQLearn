import { forwardRef } from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';
import * as S from './styles';

type Props = CheckboxProps & {
  invertColors?: boolean;
  noPadding?: boolean;
};


export const Checkbox = forwardRef<HTMLButtonElement, Props>(
  ({ invertColors, noPadding = false, ...props }, ref) => (
    <S.CheckboxWrapper>
      <MuiCheckbox
        {...props}
        ref={ref}
        sx={noPadding ? { ...props.sx, padding: 0 } : props.sx}
      />
      {invertColors ? (
        <S.CheckboxBlankIcon
          disabled={props.disabled}
          data-testid="checkbox-inverted-border"
          noPadding={noPadding}
        />
      ) : null}
    </S.CheckboxWrapper>
  )
);

Checkbox.displayName = 'Checkbox';
