import { Box, Tooltip, Typography } from '@mui/material';
import { isEmpty, isUndefined } from 'lodash-es';
import { MouseEventHandler, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Libsi18nInstance } from '../../i18n';
import logo from '../../images/assets/SQL_PTIT_LOGO.svg';
import {
  StyledContentCopyIcon,
  StyledErrorLayout,
  StyledErrorLayoutDialog,
  StyledErrorLayoutDialogAppName,
  StyledErrorLayoutDialogBottomLink,
  StyledErrorLayoutDialogButton,
  StyledErrorLayoutDialogLogo,
  StyledErrorLayoutDialogMessage,
  StyledErrorLayoutDialogMessageText,
  StyledErrorLayoutDialogTitle,
  StyledErrorLayoutDialogTitleIcon,
  StyledErrorLayoutDialogTitleText,
  StyledTraceparentIdWrapper,
} from './styles';

export type ErrorLayoutProps = {
  title: string;
  message: string;
  button?: { text: string; onClick: MouseEventHandler<HTMLButtonElement> };
  bottomLink?: { text: string; onClick: MouseEventHandler<HTMLButtonElement> };
  traceparentId?: string;
};

export function ErrorLayout({
  title,
  message,
  button,
  bottomLink,
  traceparentId,
}: ErrorLayoutProps) {
  const { t: tlibs } = useTranslation('libs', {
    i18n: Libsi18nInstance,
    keyPrefix: 'LIBS.ERROR_LAYOUT',
  });
  const [copied, setCopied] = useState<boolean>(false);

  const copyTraceparentId = () => {
    if (!isEmpty(traceparentId)) {
      void navigator.clipboard.writeText(traceparentId as string).then(() => {
        setCopied(true);
      });
    }
  };

  const resetCopyStatus = () => {
    setCopied(false);
  };

  return (
    <StyledErrorLayout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <StyledErrorLayoutDialog>
        <StyledErrorLayoutDialogAppName>
          <StyledErrorLayoutDialogLogo>
            <img src={logo} alt="SQLearn" />
          </StyledErrorLayoutDialogLogo>
        </StyledErrorLayoutDialogAppName>
        <StyledErrorLayoutDialogTitle>
          <StyledErrorLayoutDialogTitleIcon />
          <StyledErrorLayoutDialogTitleText>
            {title}
          </StyledErrorLayoutDialogTitleText>
        </StyledErrorLayoutDialogTitle>
        <StyledErrorLayoutDialogMessage>
          <StyledErrorLayoutDialogMessageText>
            {message}
          </StyledErrorLayoutDialogMessageText>
        </StyledErrorLayoutDialogMessage>
        {!isEmpty(traceparentId) && (
          <Box mx={6} mb={5} data-testid="errorLayout-traceparentId-wrapper">
            <Typography align="center" component="p" mb={1} variant="bodyXs">
              {tlibs('TRACEPARENT_ID_DESCRIPTION')}
            </Typography>
            <Tooltip
              PopperProps={{ disablePortal: true }}
              title={tlibs(copied ? 'COPIED' : 'COPY_TO_CLIPBOARD')}
            >
              <StyledTraceparentIdWrapper
                onClick={copyTraceparentId}
                onMouseLeave={resetCopyStatus}
              >
                <StyledContentCopyIcon />
                <Typography component="p" variant="bodyXs">
                  {traceparentId}
                </Typography>
              </StyledTraceparentIdWrapper>
            </Tooltip>
          </Box>
        )}
        {!isUndefined(button) && (
          <StyledErrorLayoutDialogButton
            color="primary"
            onClick={button.onClick}
            variant="contained"
            data-testid="errorLayout-button"
          >
            {button.text}
          </StyledErrorLayoutDialogButton>
        )}
        {!isUndefined(bottomLink) && (
          <StyledErrorLayoutDialogBottomLink
            color="primary"
            onClick={bottomLink.onClick}
            variant="text"
            data-testid="errorLayout-bottomLink"
          >
            {bottomLink.text}
          </StyledErrorLayoutDialogBottomLink>
        )}
      </StyledErrorLayoutDialog>
    </StyledErrorLayout>
  );
}
