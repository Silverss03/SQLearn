import { SvgIcon, SvgIconProps, SxProps, useTheme } from '@mui/material';
import { isEmpty } from 'lodash-es';

type Props = SvgIconProps & {
  type?: 'up' | 'down' | 'left' | 'right';
};

const ROTATE = {
  down: 'rotate(0deg)',
  up: 'rotate(180deg)',
  left: 'rotate(90deg)',
  right: 'rotate(270deg)',
};

export function TriangleIcon({ sx, type = 'down', ...props }: Props) {
  const theme = useTheme();
  return (
    <SvgIcon
      {...props}
      sx={
        [
          {
            color: isEmpty(props.color)
              ? theme.palette.primary.main
              : undefined,
            transform: ROTATE[type],
          },
          sx,
        ] as SxProps
      }
    >
      <svg
        width="22"
        height="19"
        viewBox="0 0 22 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 18.5L0.607694 0.5L21.3923 0.500002L11 18.5Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
}
