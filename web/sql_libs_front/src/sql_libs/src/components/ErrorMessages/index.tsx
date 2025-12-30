import { map } from 'lodash-es';
import { Grid, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import * as S from './styles';

type ErrorMessagesProps = {
  error: boolean;
  messages: string[];
};


export function ErrorMessages({
  error,
  messages,
}: ErrorMessagesProps): JSX.Element | null {
  return error ? (
    <S.Wrapper>
      <Grid
        container
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item>
          <ErrorIcon color="error" sx={{ display: 'block' }} />
        </Grid>
        <Grid item>
          {map(messages, (message, index) => (
            <Typography key={`error-messages-${index}`} variant="body2">
              {message}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </S.Wrapper>
  ) : null;
}
