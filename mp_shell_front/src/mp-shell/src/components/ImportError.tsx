import { Link } from 'react-router-dom';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';
import { translate } from '../utils/translations';

type Props = {
  withReturnTopPage?: boolean;
};
/**
 * Component displayed when the business system is down
 * @props withReturnTopPage Whether to show the return to top page link
 * @returns JSX element
 */
export function ImportError({ withReturnTopPage }: Props): JSX.Element {
  return (
    <div>
      {translate('SHELL.IMPORT_ERROR.NO_CONTENT')}
      {withReturnTopPage && (
        <>
          <br />
          <Link to={PAGE_PATH.TOP}>{translate('SHELL.IMPORT_ERROR.HERE')}</Link>
          {translate('SHELL.IMPORT_ERROR.CLICK_TO_TOP_PAGE')}
        </>
      )}
    </div>
  );
}
