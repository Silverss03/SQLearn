import { ReactNode } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { map, isString } from 'lodash-es';
import AddIcon from '@mui/icons-material/Add';

type Props = {
  title: ReactNode;
  buttons?: {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
  }[];
};

export function PageDescription({ title, buttons }: Props) {
  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
          {isString(title) ? (
            <Typography variant="h1" py="20px">
              {title}
            </Typography>
          ) : (
            title
          )}
        </Grid>
        {buttons && (
          <Grid item xs>
            <Grid container justifyContent="flex-end" columnSpacing="10px">
              {map(buttons, (button, index) => (
                <Grid item key={index}>
                  <Button
                    variant="contained"
                    disabled={button.disabled}
                    onClick={button.onClick}
                    startIcon={<AddIcon />}
                  >
                    {button.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
      <Divider sx={{ pt: '10px' }} />
    </>
  );
}
