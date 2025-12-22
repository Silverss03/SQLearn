import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { NotificationTypes } from '../dataTypes/notification-types';
import { APIResponseCommon } from '../dataTypes/common-types';

export const getNotificationService = () => AXIOS.get<APIResponseCommon.ResponseCommon<NotificationTypes.Notification[]>>(ApiConfigs.GET_NOTIFICATION);

export const getNotificationCountService = () => AXIOS.get<APIResponseCommon.ResponseCommon<NotificationTypes.Unread>>(`${ApiConfigs.GET_UNREAD_NOTIFICATION}`);

export const markNotificationAsReadService = () => AXIOS.post<APIResponseCommon.ResponseCommon<void>>(`${ApiConfigs.MARK_AS_READ_NOTIFICATION}`);
