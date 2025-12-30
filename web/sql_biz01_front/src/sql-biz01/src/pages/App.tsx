import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'reactjs-tiptap-editor/style.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';
import { Assignment } from '@mui/icons-material';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';
import { Providers } from '../components/Providers';
import '../styles/index.scss';
import { AssignmentCreate } from './AssignmentCreate';
import { AssignmentManagement } from './AssignmentManagement';
import { ClassDetail } from './ClassDetail';
import { ClassEdit } from './ClassEdit';
import { ClassManagement } from './ClassManagement';
import { ImportTeacher } from './ImportTeacher';
import { LessonsDetail } from './LessonsDetail';
import { LessonsManagement } from './LessonsManagement';
import { TeacherManagement } from './TeacherManagement';

export const routes = [
  {
    element: <Providers />,
    children: [
      {
        path: PAGE_PATH.TEACHER_MANAGEMENT,
        element: <TeacherManagement />,
        screenId: 'P-01_01',
      },
      {
        path: PAGE_PATH.TEACHER_DETAIL,
        element: <TeacherManagement />,
        screenId: 'P-01_01',
      },
      {
        path: PAGE_PATH.LESSON_MANAGEMENT,
        element: <LessonsManagement />,
        screenId: 'P-01_01',
      },
      {
        path: PAGE_PATH.TEACHER_IMPORT,
        element: <ImportTeacher />,
        screenId: 'P-01_01',
      },
      {
        path: PAGE_PATH.LESSON_DETAIL,
        element: <LessonsDetail />,
        screenId: 'P-LessonsDetail',
      },
      // {
      //   path: PAGE_PATH.LESSON_CREATE,
      //   element: <LessonsDetail />,
      //   screenId: 'P-01_01',
      // },
      {
        path: PAGE_PATH.CLASS_MANAGEMENT,
        element: <ClassManagement />,
        screenId: 'P-01_02',
      },
      {
        path: PAGE_PATH.CLASS_DETAIL,
        element: <ClassDetail />,
        screenId: 'P-01_02_01',
      },
      {
        path: 'class-edit/:id',
        element: <ClassEdit />,
        screenId: 'P-01_02_01',
      },
      {
        path: '/assignment-management',
        element: <AssignmentManagement />,
        screenId: 'P-01_02_01',
      },
      {
        path: PAGE_PATH.ASSIGNMENT_CREATE,
        element: <AssignmentCreate />,
        screenId: 'P-01_02_01',
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
