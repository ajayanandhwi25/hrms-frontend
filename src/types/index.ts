export interface Employee {
  id?: number;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

export interface AttendancePayload {
  employee_id: string;
  date: string;
  status: "Present" | "Absent";
}