import { Button } from '@mui/material';
import { Dialog } from '@sql/sql-libs/src/components';
import { useOpenReLoginDialog } from '../services/store/OpenReLoginDialog';
import { translate } from '../utils/translations';

function ReloadButton(): JSX.Element {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        window.location.href = '/';
      }}
    >
      {translate('SHELL.RELOGIN_DIALOG.CLOSE')}
    </Button>
  );
}

export function ReLoginDialog() {
  const { open } = useOpenReLoginDialog();

  return (
    <Dialog
      actions={[<ReloadButton />]}
      title={translate('SHELL.RELOGIN_DIALOG.TITLE')}
      content={translate('SHELL.RELOGIN_DIALOG.MESSAGE')}
      open={open}
      onClose={() => {}}
      width={540}
    />
  );
}
