import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import Attendance from "./components/Attendance";
import { api } from "./Api/api";
import { Employee } from "./types";
import AttendanceList from "./components/AttendanceList";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const load = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      <EmployeeForm refresh={load} />
      <EmployeeList employees={employees} refresh={load} />
      <Attendance />
      <AttendanceList />
    </Layout>
  );
}
