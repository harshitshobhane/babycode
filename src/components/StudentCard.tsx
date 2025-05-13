
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const enrollmentDate = new Date(student.enrollmentDate);
  const enrollmentTimeAgo = formatDistanceToNow(enrollmentDate, { addSuffix: true });

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{student.name}</h3>
          <p className="text-sm text-muted-foreground">{student.email}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid gap-1.5 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Course:</span>
            <Badge variant="outline" className="bg-blue-50">
              {student.course}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Enrolled:</span>
            <span className="text-sm">{enrollmentTimeAgo}</span>
          </div>
          
          {student.grade && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Grade:</span>
              <Badge className={`${
                student.grade.startsWith("A") 
                  ? "bg-green-100 text-green-800"
                  : student.grade.startsWith("B") 
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
              }`}>
                {student.grade}
              </Badge>
            </div>
          )}
          
          <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
            <Link to={`/students/${student.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
