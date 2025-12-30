import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/ArrowBackIosRounded';

type LinkProps = {
  href: string;
};

export function PreviousPageLink2({ href }: LinkProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate(href)}>
      <NavigateBeforeIcon color="primary" />
    </IconButton>
  );
}
