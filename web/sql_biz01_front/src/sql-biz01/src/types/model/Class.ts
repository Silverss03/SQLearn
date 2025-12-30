interface User {
  id: number;
  email: string;
  two_factor_secret: string | null;
  two_factor_recovery_codes: string | null;
  two_factor_confirmed_at: string | null;
  name: string;
  role: 'teacher' | 'admin' | 'student' | string;
  is_active: number; // 0 | 1
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Class {
  id: number;
  class_code: string;
  class_name: string;
  teacher_id: number;
  semester: string;
  academic_year: string;
  max_students: number;
  is_active: number; // 0 | 1
  created_at: string;
  updated_at: string;
  teacher: Teacher;
}
