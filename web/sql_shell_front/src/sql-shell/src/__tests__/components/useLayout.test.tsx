import { RouteObject } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { useLayout } from '../../components/useLayout';

let pathname = '';

const mockRoutes = [
  {
    path: 'showHeader',
    element: <div>showHeader</div>,
  },
  {
    path: 'showHeader2',
    element: <div>showHeader2</div>,
    disableHeader: false,
  },
  {
    path: 'disableHeader',
    element: <div>disableHeader</div>,
    disableHeader: true,
    children: [
      {
        path: 'showHeader3',
        element: <div>showHeader3</div>,
      },
      {
        path: 'showHeader4',
        element: <div>showHeader4</div>,
        disableHeader: false,
      },
    ],
  },
] as RouteObject[];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useLocation: jest.fn(() => ({
    pathname,
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('useLayout', () => {
  it('disableHeader should be false when current path RouteObject does not have disableHeader', () => {
    pathname = '/showHeader';
    const { result } = renderHook(() => useLayout(mockRoutes));

    expect(result.current.disableHeader).toBe(false);
  });

  it('disableHeader should be false when current path RouteObject disableHeader is false', () => {
    pathname = '/showHeader2';
    const { result } = renderHook(() => useLayout(mockRoutes));

    expect(result.current.disableHeader).toBe(false);
  });

  it('disableHeader should be true when current path RouteObject disableHeader is true', () => {
    pathname = '/disableHeader';
    const { result } = renderHook(() => useLayout(mockRoutes));

    expect(result.current.disableHeader).toBe(true);
  });

  it('disableHeader should be false when current path RouteObject does not have disableHeader even if parent has disableHeader true', () => {
    pathname = '/disableHeader/showHeader3';
    const { result } = renderHook(() => useLayout(mockRoutes));

    expect(result.current.disableHeader).toBe(false);
  });

  it('disableHeader should be false when current path RouteObject disableHeader is false even if parent has disableHeader true', () => {
    pathname = '/disableHeader/showHeader4';
    const { result } = renderHook(() => useLayout(mockRoutes));

    expect(result.current.disableHeader).toBe(false);
  });
});
