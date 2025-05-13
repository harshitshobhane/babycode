
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Student } from "@/types/student";
import { fetchStudent } from "@/services/studentApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getStudent = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const data = await fetchStudent(id);
        setStudent(data);
      } catch (error) {
        console.error("Failed to fetch student:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load student details. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    getStudent();
  }, [id, toast]);

  const initials = student?.name
    ? student.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : student ? (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-center mb-1">{student.name}</h2>
              <p className="text-muted-foreground text-center mb-4">{student.email}</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                {student.course}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <h3 className="text-xl font-semibold">Student Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-md">
                  <div>
                    <p className="text-sm text-muted-foreground">ID</p>
                    <p className="font-medium">{student.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Course</p>
                    <p className="font-medium">{student.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Enrollment Date</p>
                    <p className="font-medium">
                      {format(new Date(student.enrollmentDate), "PPP")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-medium">{student.grade || "N/A"}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Academic Performance</h4>
                  <div className="h-40 flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                    <p className="text-muted-foreground text-sm">
                      Academic performance data not available
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Email:</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Student not found</h3>
          <p className="text-muted-foreground">
            The student you're looking for doesn't exist or has been removed.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;
