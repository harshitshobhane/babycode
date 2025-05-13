
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Student } from "@/types/student";

// Create axios instance
const api = axios.create({
  baseURL: "/api",
});

// Create mock adapter
const mock = new MockAdapter(api, { delayResponse: 1000 });

// Mock data
const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Smith",
    email: "johnsmith@example.com",
    course: "Computer Science",
    enrollmentDate: "2023-09-01",
    grade: "A",
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=0D8ABC&color=fff",
  },
  {
    id: "2",
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    course: "Mathematics",
    enrollmentDate: "2023-09-01",
    grade: "B+",
    avatar: "https://ui-avatars.com/api/?name=Emma+Johnson&background=2DD4BF&color=fff",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    course: "Physics",
    enrollmentDate: "2023-08-15",
    grade: "A-",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=3A6CFF&color=fff",
  },
  {
    id: "4",
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    course: "Chemistry",
    enrollmentDate: "2023-09-05",
    grade: "B",
    avatar: "https://ui-avatars.com/api/?name=Sophia+Davis&background=0D9488&color=fff",
  },
  {
    id: "5",
    name: "William Wilson",
    email: "william.wilson@example.com",
    course: "Biology",
    enrollmentDate: "2023-08-20",
    grade: "A",
    avatar: "https://ui-avatars.com/api/?name=William+Wilson&background=1D42ED&color=fff",
  },
  {
    id: "6",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    course: "Computer Science",
    enrollmentDate: "2023-09-10",
    grade: "A+",
    avatar: "https://ui-avatars.com/api/?name=Olivia+Martinez&background=5A95FF&color=fff",
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james.taylor@example.com",
    course: "Engineering",
    enrollmentDate: "2023-08-25",
    grade: "B+",
    avatar: "https://ui-avatars.com/api/?name=James+Taylor&background=2955FF&color=fff",
  },
  {
    id: "8",
    name: "Isabella Anderson",
    email: "isabella.anderson@example.com",
    course: "Mathematics",
    enrollmentDate: "2023-09-03",
    grade: "A-",
    avatar: "https://ui-avatars.com/api/?name=Isabella+Anderson&background=14B8A6&color=fff",
  },
];

// Mock API endpoints
mock.onGet("/students").reply(200, mockStudents);

mock.onGet(/\/students\/\d+/).reply((config) => {
  const id = config.url?.split("/").pop();
  const student = mockStudents.find((s) => s.id === id);
  
  return student ? [200, student] : [404, { message: "Student not found" }];
});

mock.onPost("/students").reply((config) => {
  const newStudent = JSON.parse(config.data);
  
  // Validate required fields
  if (!newStudent.name || !newStudent.email || !newStudent.course) {
    return [400, { message: "Missing required fields" }];
  }
  
  // Generate a new ID (in a real app this would be done by the backend)
  const id = String(mockStudents.length + 1);
  
  const studentWithId = {
    ...newStudent,
    id,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStudent.name)}&background=3A6CFF&color=fff`
  };
  
  // In a real app, we would add to database. Here we just return the new student
  return [201, studentWithId];
});

// API service functions
export const fetchStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>("/students");
  return response.data;
};

export const fetchStudent = async (id: string): Promise<Student> => {
  const response = await api.get<Student>(`/students/${id}`);
  return response.data;
};

export const addStudent = async (student: Omit<Student, "id" | "avatar">): Promise<Student> => {
  const response = await api.post<Student>("/students", student);
  return response.data;
};
