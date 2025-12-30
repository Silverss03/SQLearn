
export type Message = {
  id: string;
  avatarSrc?: string;
  content: string;
  isMine: boolean;
  timestamp: Date;
  senderName: string;
  recipientsName?: string;
};


export type User = {
  id: number;
  name: string;
  companyName: string;
  avatarSrc?: string;
  officeName: string;
};


export type Field = {
  id: string;
  name: string;
};

export type Option = {
  value: string;
  label: string;
};

export type SubSystemName = 'KERNEL' | 'BIZ_01';

export type { Json } from './Json';
export { jsonSchema } from './schema/jsonSchema';

export type { GTMCustomData } from './GTMCustomData';

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type WithoutIndexSignature<T> = {
  [K in keyof T as string extends K
  ? never
  : number extends K
  ? never
  : K]: T[K];
};


export type * from './LoginUser';

export type * from './AxiosClient';

export type * from './MpComponentTypes';
