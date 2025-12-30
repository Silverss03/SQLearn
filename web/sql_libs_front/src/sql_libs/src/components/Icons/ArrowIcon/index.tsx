import { SvgIcon, SvgIconProps, SxProps } from '@mui/material';
import { isEmpty } from 'lodash-es';
import { ARROW_ROTATE, ArrowRotateName } from '../../../constants';
import { theme } from '../../../theme';

type Props = SvgIconProps & {
  arrowRotate: ArrowRotateName;
};


export function ArrowIcon({ sx, arrowRotate, ...props }: Props) {
  return (
    <SvgIcon
      {...props}
      sx={
        [
          {
            color: isEmpty(props.color)
              ? theme.palette.primary.main
              : undefined,
          },
          sx,
        ] as SxProps
      }
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="19"
          cy="19"
          r="18"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={ARROW_ROTATE[arrowRotate]}
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
}
