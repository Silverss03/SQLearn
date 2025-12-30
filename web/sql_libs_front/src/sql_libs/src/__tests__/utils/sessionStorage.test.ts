import { z } from 'zod';
import { Json } from '../../types';
import { setItem, getItem, removeItem } from '../../utils/sessionStorage';

const sessionStorageSpy = {
  setItem: jest.spyOn(Storage.prototype, 'setItem'),
  getItem: jest.spyOn(Storage.prototype, 'getItem'),
  removeItem: jest.spyOn(Storage.prototype, 'removeItem'),
};

const describeSetItem = () =>
  describe('setItem', () => {
    const cases: { name: string; args: { key: string; value: Json } }[] = [
      {
        name: 'should not throw error when value is null',
        args: { key: 'key', value: null },
      },
      {
        name: 'should not throw error for primitive values',
        args: { key: 'key', value: 0 },
      },
      {
        name: 'should not throw error for arrays',
        args: { key: 'key', value: ['value1', 'value2', 'value3'] },
      },
      {
        name: 'should not throw error for objects',
        args: {
          key: 'key',
          value: {
            username: 'Taro',
            age: 123,
            items: ['item1', 'item2', 'item3'],
          },
        },
      },
    ];
    it.each(cases)('$name', ({ args }) => {
      setItem(args.key, args.value);
      expect(setItem).not.toThrow();
      expect(sessionStorageSpy.setItem).toHaveBeenCalled();
    });
  });

const describeGetItem = () =>
  describe('getItem', () => {
    const userSchema = z.object({
      username: z.string(),
      age: z.number(),
      items: z.string().array(),
    });
    const cases: {
      name: string;
      args: { key: string; value: z.ZodType<Json> };
      mock: { value: string | null };
      retval: Json;
    }[] = [
        {
          name: 'should return null when key does not exist',
          args: { key: 'key', value: userSchema },
          mock: { value: null },
          retval: null,
        },
        {
          name: 'should return null for corrupted JSON',
          args: { key: 'key', value: userSchema },
          mock: { value: '{"username":"Taro",' },
          retval: null,
        },
        {
          name: 'should return null when type does not match',
          args: { key: 'key', value: userSchema },
          mock: { value: '0' },
          retval: null,
        },
        {
          name: 'should return null when value is empty',
          args: { key: 'key', value: userSchema },
          mock: { value: '' },
          retval: null,
        },
        {
          name: 'should return null when value is null',
          args: { key: 'key', value: userSchema.nullable() },
          mock: { value: 'null' },
          retval: null,
        },
        {
          name: 'should return empty string when value is empty string',
          args: { key: 'key', value: z.string() },
          mock: { value: '""' },
          retval: '',
        },
        {
          name: 'should return primitive value for primitives',
          args: { key: 'key', value: z.number() },
          mock: { value: '123' },
          retval: 123,
        },
        {
          name: 'should return array for arrays',
          args: { key: 'key', value: z.string().array() },
          mock: { value: '["value1", "value2", "value3"]' },
          retval: ['value1', 'value2', 'value3'],
        },
        {
          name: 'should return object for objects',
          args: {
            key: 'key',
            value: userSchema,
          },
          mock: {
            value:
              '{"username": "Taro","age": 123,"items":["item1","item2","item3"]}',
          },
          retval: {
            username: 'Taro',
            age: 123,
            items: ['item1', 'item2', 'item3'],
          },
        },
      ];
    it.each(cases)('$name', ({ args, mock, retval }) => {
      sessionStorageSpy.getItem.mockImplementation(() => mock.value);
      const value = getItem(args.key, args.value);
      expect(value).toEqual(retval);
      sessionStorageSpy.getItem.mockClear();
    });
  });

const describeRemoveItem = () =>
  describe('removeItem', () => {
    it('should call global removeItem', () => {
      removeItem('key');
      expect(sessionStorageSpy.removeItem).toHaveBeenCalled();
    });
  });

describe('sessionStorage', () => {
  describeSetItem();
  describeGetItem();
  describeRemoveItem();
});
