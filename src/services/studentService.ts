import { collection, addDoc, getDocs, query, where, orderBy, limit, startAfter, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  year: number;
  gpa: number;
  enrollmentDate: string;
  address?: string;
  phone?: string;
  status: 'active' | 'inactive';
  lastModified: string;
}

export type SortField = 'name' | 'course' | 'year' | 'gpa';
export type SortOrder = 'asc' | 'desc';

// Mock data for initial development
const mockStudents: Student[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    course: 'Computer Science', 
    year: 3, 
    gpa: 3.8,
    enrollmentDate: '2021-09-01',
    address: '123 Main St, City',
    phone: '555-0123',
    status: 'active',
    lastModified: '2024-03-15'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    course: 'Engineering', 
    year: 2, 
    gpa: 3.9,
    enrollmentDate: '2022-09-01',
    address: '456 Oak Ave, Town',
    phone: '555-0124',
    status: 'active',
    lastModified: '2024-03-14'
  },
  { 
    id: '3', 
    name: 'Mike Johnson', 
    email: 'mike@example.com', 
    course: 'Business', 
    year: 4, 
    gpa: 3.7,
    enrollmentDate: '2020-09-01',
    address: '789 Pine Rd, Village',
    phone: '555-0125',
    status: 'inactive',
    lastModified: '2024-03-13'
  },
  { 
    id: '4', 
    name: 'Sarah Wilson', 
    email: 'sarah@example.com', 
    course: 'Computer Science', 
    year: 1, 
    gpa: 3.5,
    enrollmentDate: '2023-09-01',
    address: '321 Elm St, City',
    phone: '555-0126',
    status: 'active',
    lastModified: '2024-03-12'
  },
  { 
    id: '5', 
    name: 'David Brown', 
    email: 'david@example.com', 
    course: 'Engineering', 
    year: 3, 
    gpa: 3.6,
    enrollmentDate: '2021-09-01',
    address: '654 Maple Dr, Town',
    phone: '555-0127',
    status: 'active',
    lastModified: '2024-03-11'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const studentService = {
  // Get students with pagination, sorting, and filtering
  async getStudents({
    courseFilter,
    page = 1,
    pageSize = 10,
    sortField = 'name',
    sortOrder = 'asc'
  }: {
    courseFilter?: string;
    page?: number;
    pageSize?: number;
    sortField?: SortField;
    sortOrder?: SortOrder;
  }): Promise<{ students: Student[]; total: number }> {
    await delay(1000); // Simulate network delay
    
    // Always use mock data for now
    const filtered = mockStudents.filter(student => 
      !courseFilter || student.course === courseFilter
    );
    
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortOrder === 'asc' 
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });
    
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    return {
      students: sorted.slice(start, end),
      total: filtered.length
    };
  },

  // Get a single student by ID
  async getStudent(id: string): Promise<Student | null> {
    await delay(500);
    
    // Always use mock data for now
    return mockStudents.find(s => s.id === id) || null;
  },

  // Add a new student
  async addStudent(student: Omit<Student, 'id' | 'lastModified'>): Promise<Student> {
    await delay(1000);
    
    const newStudent: Student = {
      id: (mockStudents.length + 1).toString(),
      ...student,
      lastModified: new Date().toISOString()
    };
    
    mockStudents.push(newStudent);
    return newStudent;
  },

  // Update an existing student
  async updateStudent(id: string, student: Partial<Omit<Student, 'id' | 'lastModified'>>): Promise<Student> {
    await delay(1000);
    
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Student not found');
    }
    
    const updatedStudent = {
      ...mockStudents[index],
      ...student,
      lastModified: new Date().toISOString()
    };
    
    mockStudents[index] = updatedStudent;
    return updatedStudent;
  }
}; 