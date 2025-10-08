import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { Dialog } from '@sql/sql-libs/src/components';

type GlobalHeaderErrorHandlingProps = {
  errorOccured: boolean;
  initErrorOccured: () => void;
};

/**
 * Global Header Error Handling
 */
export function GlobalHeaderErrorHandling({
  errorOccured,
  initErrorOccured,
}: GlobalHeaderErrorHandlingProps): JSX.Element {
  const { t: tKernel } = useTranslation('kernel', {
    keyPrefix: 'KERNEL.GLOBAL_HEADER',
  });
  const { t: tValidate } = useTranslation('validate', {
    keyPrefix: 'VALIDATE',
  });

  const open = errorOccured;

  return (
    <Dialog
      title={tKernel('ERROR_DIALOG_TITLE')}
      content={tValidate('')}
      open={open}
      actions={[
        <Button onClick={initErrorOccured} variant="outlined">
          {tKernel('ERROR_DIALOG_CLOSE')}
        </Button>,
      ]}
    />
  );
}
