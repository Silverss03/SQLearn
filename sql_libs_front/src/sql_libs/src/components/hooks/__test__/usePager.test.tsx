import { act, renderHook } from '@testing-library/react';
import { usePager, TPager } from '../usePager';

const fetchData = async () => Promise.resolve([1, 2, 3, 4, 5]);

const fetchEmptyData = async () => Promise.resolve([]);

describe('getData', () => {
  describe('初回処理', () => {
    it('データが正しく取得されること', async () => {
      const { result } = renderHook(() => usePager(fetchData));

      await act(async () => {
        await result.current.getData();
      });

      expect(result.current.data).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('ページ番号がインクリメントされていること', async () => {
      const { result } = renderHook(() => usePager(fetchData));

      await act(async () => {
        await result.current.getData();
      });

      expect(result.current.pageNum).toEqual(2);
    });

    it('次のページが存在すること', async () => {
      const { result } = renderHook(() => usePager(fetchData));

      await act(async () => {
        await result.current.getData();
      });

      expect(result.current.hasNextPage).toBe(true);
    });
  });

  describe('検索', () => {
    it('データが正しく取得されること', async () => {
      const { result } = renderHook(() => usePager(fetchData));

      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      expect(result.current.data).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('ページ番号がインクリメントされていること', async () => {
      const { result } = renderHook(() => usePager(fetchData));

      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      expect(result.current.pageNum).toEqual(2);
    });

    it('次のページが存在すること', async () => {
      const { result } = renderHook(() => usePager(fetchData));

      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      expect(result.current.hasNextPage).toBe(true);
    });

    it('リクエストパラメータが更新されていること', async () => {
      const { result } = renderHook(() => usePager(fetchData));

      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      expect(result.current.requestParams).toStrictEqual({ name: 'example' });
    });
  });

  describe('リセット', () => {
    it('データが空の配列であること', async () => {
      const { result } = renderHook(() => usePager(fetchData));
      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      act(() => {
        result.current.initialize();
      });

      expect(result.current.data).toStrictEqual([]);
    });

    it('ページ番号が1であること', async () => {
      const { result } = renderHook(() => usePager(fetchData));
      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      act(() => {
        result.current.initialize();
      });

      expect(result.current.pageNum).toEqual(1);
    });

    it('次のページが存在すること', async () => {
      const { result } = renderHook(() => usePager(fetchData));
      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      act(() => {
        result.current.initialize();
      });

      expect(result.current.hasNextPage).toBe(true);
    });

    it('リクエストパラメータが空のオブジェクトであること', async () => {
      const { result } = renderHook(() => usePager(fetchData));
      await act(async () => {
        await result.current.getData({ name: 'example' } as TPager);
      });

      act(() => {
        result.current.initialize();
      });

      expect(result.current.requestParams).toStrictEqual({});
    });
  });

  describe('データが取得できなかった', () => {
    it('データが更新されていないこと', async () => {
      const { result } = renderHook(() => usePager(fetchEmptyData));

      await act(async () => {
        await result.current.getData();
      });

      expect(result.current.data).toStrictEqual([]);
    });

    it('ページ番号が更新されていないこと', async () => {
      const { result } = renderHook(() => usePager(fetchEmptyData));

      await act(async () => {
        await result.current.getData();
      });

      expect(result.current.data).toStrictEqual([]);
      expect(result.current.pageNum).toEqual(1);
    });

    it('次のページが存在しないこと', async () => {
      const { result } = renderHook(() => usePager(fetchEmptyData));

      await act(async () => {
        await result.current.getData();
      });

      expect(result.current.data).toStrictEqual([]);
      expect(result.current.hasNextPage).toBe(false);
    });

    it('リクエストパラメータが更新されていないこと', async () => {
      const { result } = renderHook(() => usePager(fetchEmptyData));

      await act(async () => {
        await result.current.getData();
      });

      expect(result.current.data).toStrictEqual([]);
      expect(result.current.requestParams).toStrictEqual({});
    });
  });
});
