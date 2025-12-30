import { CircularProgress, CircularProgressProps } from '@mui/material';

type Props = CircularProgressProps & {
  loading: boolean;
};

export function Loading({ loading, ...props }: Props): JSX.Element | null {
  return loading ? <CircularProgress {...props} /> : null;
}
