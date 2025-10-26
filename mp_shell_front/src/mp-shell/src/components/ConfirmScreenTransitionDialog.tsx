import { ExitConfirmationDialog } from '@sql/sql-libs/src/components';
import { useScreenTransition } from '@sql/sql-libs/src/contexts';

export function ConfirmScreenTransitionDialog(): JSX.Element {
  const {
    cancelScreenTransition,
    isScreenTransitionBlocked,
    proceedScreenTransition,
  } = useScreenTransition();

  return (
    <ExitConfirmationDialog
      open={isScreenTransitionBlocked}
      onCancelButtonClick={cancelScreenTransition}
      onConfirmationButtonClick={proceedScreenTransition}
    />
  );
}
