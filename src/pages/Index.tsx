
import { useEffect, useState } from "react";
import { fetchStudents } from "@/services/studentApi";
import { Student, CourseType } from "@/types/student";
import StudentCard from "@/components/StudentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<CourseType>("All");
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load student data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, [toast]);

  useEffect(() => {
    let results = students;

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(student => 
        student.name.toLowerCase().includes(searchTermLower) ||
        student.email.toLowerCase().includes(searchTermLower)
      );
    }

    // Filter by course
    if (selectedCourse !== "All") {
      results = results.filter(student => student.course === selectedCourse);
    }

    setFilteredStudents(results);
  }, [searchTerm, selectedCourse, students]);

  // Get list of unique courses for filter dropdown
  const uniqueCourses = Array.from(new Set(students.map(student => student.course)));

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        {currentUser && (
          <Button asChild>
            <Link to="/add-student">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Link>
          </Button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="stats grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Students</div>
            <div className="text-3xl font-bold text-blue-700">{students.length}</div>
          </div>
          <div className="stat bg-teal-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Courses</div>
            <div className="text-3xl font-bold text-teal-700">{uniqueCourses.length}</div>
          </div>
          <div className="stat bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Top Grade</div>
            <div className="text-3xl font-bold text-purple-700">A+</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2 min-w-[200px]">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={selectedCourse} 
              onValueChange={(value) => setSelectedCourse(value as CourseType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Courses</SelectItem>
                {uniqueCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 text-4xl">🔍</div>
            <h3 className="text-lg font-medium">No students found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
