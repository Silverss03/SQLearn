import { Option } from '@sql/sql-libs/src/types';
import * as _ from 'lodash-es';
import { BUILDEE_ROLES, BUILDEE_USING_STATUS, MP_ROLES } from './constants';

export const MP_ROLE_OPTIONS: Option[] = _.map(
  _.entries(MP_ROLES),
  ([value, label]) => ({
    value,
    label,
  })
);

export const BUILDEE_ROLE_OPTIONS: Option[] = _.map(BUILDEE_ROLES, (role) => ({
  value: _.toString(role.id),
  label: role.name,
}));

export const BUILDEE_USING_STATUS_OPTION: Option[] = _.map(
  BUILDEE_USING_STATUS,
  (status) => ({
    value: _.toString(status.id),
    label: status.name,
  })
);

export const mappingBuildeeRoleWithMpRole = (buildeeRoleId: string) => {
  switch (buildeeRoleId) {
    case '2':
      return 'FULL';
    case '3':
      return 'GROUP';
    case '4':
      return 'PROJECT';
    default:
      return '';
  }
};
