
export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  grade?: string;
  avatar?: string;
}

export type CourseType = "Computer Science" | "Mathematics" | "Physics" | "Chemistry" | "Biology" | "Engineering" | "All";
