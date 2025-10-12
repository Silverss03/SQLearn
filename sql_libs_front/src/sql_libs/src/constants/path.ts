import * as _ from 'lodash-es';

export const MAIN_PATH = {
  KERNEL: [''],
  BIZ_01: ['teacher', 'class', 'lesson', ''],
};

export const PAGE_PATH = {
  CONNECT: {
    AUTHORIZE: '/connect/authorize',
  },
  TOP: '/',
  LOGOUT: '/logout',
  NOTIFICATION: '/notification',
  NOTIFICATION_DETIAL: '/notification/:id',
  TEACHER_MANAGEMENT: '/teacher-management',
  TEACHER_DETAIL: '/teacher-detail/:id',
  TEACHER_IMPORT: '/teacher-import',
  CLASS_MANAGEMENT: '/class-management',
  CLASS_DETAIL: '/class-detail/:id',
  CLASS_EDIT: '/class-edit/:id',
  CLASS_IMPORT: '/class-import',
  CLASS_STUDENT_MANAGEMENT: '/class-detail/:class_id/student/management',
  CLASS_STUDENT_DETAIL: '/class-detail/:class_id/student/detail/:id',
  LESSON_MANAGEMENT: '/lesson-management',
  LESSON_DETAIL: '/lesson-detail/:id',
  LESSON_CREATE: '/lesson-create',
  ASSIGNMENT_MANAGEMENT: '/assignment-management',
  ASSIGNMENT_DETAIL: '/assignment-detail/:id',
  ASSIGNMENT_CREATE: '/assignment-create',
};

export const PATH_PATTERNS = _.pickBy(PAGE_PATH, _.isString);
