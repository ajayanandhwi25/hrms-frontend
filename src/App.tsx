import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Attendance from "./components/Attendance";
import { Employee } from "./types";
import { api } from "./Api/api";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    const res = await api.get<Employee[]>("/employees");
    setEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>HRMS Lite</h1>

      <EmployeeForm refresh={loadEmployees} />

      {loading ? <p>Loading...</p> : <EmployeeList employees={employees} refresh={loadEmployees} />}

      <Attendance />
    </div>
  );
}
