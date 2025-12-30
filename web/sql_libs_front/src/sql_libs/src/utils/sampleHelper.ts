import axios from 'axios';
import { Message } from '../types';


export const fetchSampleData = async <T>(params?: {
  name?: string;
  page?: number;
}): Promise<T[]> => {
  const response = await axios.get('https://gorest.co.in/public/v2/users?', {
    params,
  });
  return (response.data as T[]).map((data: T) => ({ ...data, type: 'user' }));
};

type SampleMessage = {
  id: number;
  name: string;
  email: string;
  body: string;
};
export const fetchSampleMessageData = async (params?: {
  page?: number;
}): Promise<Message[]> => {
  const response = await axios.get('https://gorest.co.in/public/v2/comments?', {
    params,
  });
  const messages: Message[] = (response.data as SampleMessage[]).map(
    (item: SampleMessage, index: number) => {
      const recipientsNames: string[] = (response.data as SampleMessage[])
        .map((recipientsName: { name: string }) => recipientsName.name)
        .slice(0, Math.floor(Math.random() * 5))
        .map((name: string) => `@${name}`);

      const pageIndex = (params?.page ?? 1) - 1;

      return {
        id: item.id.toString(),
        senderName: item.name,
        recipientsName: recipientsNames.join(' '),
        isMine: Math.random() < 0.5,
        timestamp: new Date(
          new Date('2024-02-19T12:00:00').getTime() -
          (pageIndex * 10 + index) * 60000
        ),
        content: item.body,
      } as Message;
    }
  );
  return messages;
};
