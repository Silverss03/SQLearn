export declare namespace NotificationTypes {
export interface Notification {
  id: number
  title: string
  body: string
  type: string
  data: Data
  is_read: number
  sent_at: string
}

export interface Data {
  type: string
  exam_id: number
  class_id: number
  click_action: string
}

export interface Unread {
    unread_count: number;
}
}
