import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import * as S from './styles';
import { Dialog } from '../../Dialog';
import { ManualDialogContent } from '../ManualDialogContent.tsx';
import { ENV_NAME } from '../../../constants';
// import { useThrowError } from '../../../utils/useThrowError';
// import { NotFoundException } from '../../../errors';

type ManualProps = {
  env?: string;
  helpUrl?: string;
};


export function Manual({ env, helpUrl }: ManualProps): JSX.Element {
  const { t: tCommon } = useTranslation('common');
  const { t: tLibs } = useTranslation('libs');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  // const { throwError } = useThrowError();

  const handleClick = useCallback(() => {
    switch (env) {
      case ENV_NAME.IT:
      case ENV_NAME.STAGING:
      case ENV_NAME.PROD:
        window.open(helpUrl, '_blank');
        break;
      case ENV_NAME.DEMO:
      case ENV_NAME.DEV:
      case ENV_NAME.UAT:
      default:
        setDialogOpen(true);
        // throwError(new NotFoundException());
        break;
    }
  }, [env, helpUrl]);

  return (
    <>
      <S.ManualButton color="primary" onClick={handleClick} disabled>
        <S.ManualButtonIcon />
        <S.ManualButtonText>
          {tLibs('LIBS.MANUAL.ICON_TEXT')}
        </S.ManualButtonText>
      </S.ManualButton>

      <Dialog
        actions={[
          <Button
            color="primary"
            onClick={() => setDialogOpen(false)}
            variant="outlined"
            sx={{ width: 160 }}
          >
            {tCommon('COMMON.CLOSE')}
          </Button>,
        ]}
        content={<ManualDialogContent />}
        divider
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        title={tCommon('COMMON.CONFIRMATION')}
      />
    </>
  );
}
